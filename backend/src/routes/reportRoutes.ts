import * as express from 'express'
import * as controller from '../controllers/reportController'

const router: express.Router = express.Router()

router.route('/')
    .get(controller.listReports)

router.route('/byType/:type')
    .get(controller.getReportByType)

router.route('/byUser/:user')
    .get(controller.getReportByUser)

export default router