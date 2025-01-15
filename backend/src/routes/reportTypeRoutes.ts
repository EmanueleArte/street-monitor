import * as express from 'express'
import * as controller from '../controllers/reportTypeController'

const router: express.Router = express.Router()

router.route('/')
    .get(controller.listReportTypes)
    .post(controller.createReportType)

router.route('/:name')
    .get(controller.getReportTypeByName)

router.route('/update/:name')
    .put(controller.updateReportType)

router.route('/delete/:name')
    .delete(controller.deleteReportType)

export default router