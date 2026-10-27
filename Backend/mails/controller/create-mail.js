const parseCSV = require('../../utils/csv-parse');
const scheduleMail = require('./schedule-mail');
const sendMail = require('./send-mail');
const { execute } = require('../../utils/db-connection');
const AppError = require('../../global-middleware/app-error')
const responseHandler = require('../../global-middleware/response-handler')

const queryTemplateCheck = `SELECT id, name, body FROM templates WHERE id = ?`
const queryEmailLog = `Insert into email_logs (template_id,sent_by,no_of_receivers,success_receivers,rejected_receivers,sent_at) Values (?,?,?,?,?,?)`
//no postionalparams
const createEmail = async (req, res) => {

    try {
        const { template_id, schedule_at } = req.body;
        const file = req.file;
        const now = new Date()
        const scheduledTime = new Date(schedule_at);
        // console.log()
        if (!file || !file.originalname.includes(".csv")) {
            throw new AppError(400, "CSV file required");
        }
        // console.log(scheduledTime.getTime(), now.getTime())

        if (scheduledTime.getTime() <= now.getTime()) //No. of ms since January 1, 1970
            throw new AppError(400, "Schedule should be after current time!");

        const { validData, errors } = await parseCSV(file.path);
        // console.log(validData)
        // console.log(errors)
        if (validData.length === 0) {
            throw new AppError(400, "No valid data in CSV");
        }

        const templateResult = await execute(queryTemplateCheck, [template_id]);

        if (!templateResult[0]) {
            throw new AppError(400, "Template not found");
        }

        const template = templateResult[0];
        const emailQueryParams = [template_id, res.locals.user.id, (validData.length + errors.length), validData.length, errors.length, (schedule_at ? schedule_at : new Date())]
        const resultLogs = await execute(queryEmailLog, emailQueryParams);

        console.log(resultLogs)

        if (schedule_at) {
            scheduleMail(schedule_at, validData, template);
        } else {
            await sendMail(validData, template);
        }


        return responseHandler(200, {
            totalRows: validData.length + errors.length,
            successCount: validData.length,
            failedCount: errors.length,
            failedRowNumber: errors
        }, "Email Sent Succuessfully!!", res);

    } catch (err) {
        // console.log(err)
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                status: err.statusCode,
                message: err.message
            });
        }
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
module.exports = createEmail;

