import * as express from 'express'
import * as controller from '../controllers/reportController'

const router: express.Router = express.Router()

router.route('/')
    .get(controller.listReports)

router.route('/byType/:type')
    .get(controller.getReportsByType)

router.route('/byUser/:user')
    .get(controller.getReportsByUser)

router.route('/byCoordinates/:latitude&:longitude&:radius')
    .get(controller.getReportsByCoordinates)

export default router