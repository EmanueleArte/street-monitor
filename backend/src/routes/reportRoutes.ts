import * as express from 'express'
import * as controller from '../controllers/reportController'

const router: express.Router = express.Router()

router.route('/')
    .get(controller.listReports)
    .post(controller.createReport)

router.route('/by-id/:id')
    .get(controller.getReportById)
    .put(controller.updateReport)

router.route('/by-type/:type')
    .get(controller.getReportsByType)

router.route('/by-user/:user')
    .get(controller.getReportsByUser)

router.route('/by-coordinates/:latitude&:longitude&:radius')
    .get(controller.getReportsByCoordinates)

export default router