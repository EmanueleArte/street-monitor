import * as express from 'express'
import * as controller from '../controllers/reportController'

const router: express.Router = express.Router()

router.route('/')
    .get(controller.listReports)
    .post(controller.createReport)

router.route('/byId/:id')
    .get(controller.getReportById)
    .post(controller.updateReport)

router.route('/byType/:type')
    .get(controller.getReportsByType)

router.route('/byUser/:user')
    .get(controller.getReportsByUser)

router.route('/byCoordinates/:latitude&:longitude&:radius')
    .get(controller.getReportsByCoordinates)

export default router