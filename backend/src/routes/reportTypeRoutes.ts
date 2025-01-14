import * as express from 'express'
import * as controller from '../controllers/reportTypeController'

const router: express.Router = express.Router()

router.route('/')
    .get(controller.listReportTypes)

router.route('/:name')
    .get(controller.getReportTypeByName)

export default router