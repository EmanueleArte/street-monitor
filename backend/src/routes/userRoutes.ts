import * as express from 'express'
import * as controller from '../controllers/userController'

const router: express.Router = express.Router()

router.route('/')
    .post(controller.createUser)

router.route('/:id')
    .get(controller.getUserByUsername)
    .put(controller.updateUser)

router.route('/:id/notifications')
    .get(controller.listNotifications)
    .post(controller.addNotification)

router.route('/:id/notifications/:nid')
    .delete(controller.deleteNotification)

router.route('/:id/favorites')
    .get(controller.listFavoriteSpots)
    .post(controller.addFavoriteSpot)

router.route('/:id/favorites/:fid')
    .delete(controller.deleteFavoriteSpot)

// get all the users that have a favorite spot in the area defined by the
// center (latitiude, longitude) with a radius of "radius"
router.route('/favorites/:latitude&:longitude&:radius')
    .get(controller.getUsersWithSpotNearNewReport)

export default router