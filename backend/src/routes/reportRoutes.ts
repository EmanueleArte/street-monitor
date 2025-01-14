import * as express from 'express'
import * as controller from '../controllers/reportController'

const router: express.Router = express.Router()

router.route('/')
    .get(controller.listReports)

router.route('/:type')
    .get(controller.getReportByType)

export default router