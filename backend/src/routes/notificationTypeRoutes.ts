import * as express from 'express'
import * as controller from '../controllers/notificationTypeController'

const router: express.Router = express.Router()

router.route('/')
    .get(controller.listNotificationTypes)

router.route('/:name')
    .get(controller.getNotificationTypeByName)

export default router