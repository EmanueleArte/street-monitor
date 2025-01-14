import * as express from 'express'
import * as controller from '../controllers/reportTypeController'

const router: express.Router = express.Router()

router.route('/:id')
    .get(controller.getReportTypeById)

export default router