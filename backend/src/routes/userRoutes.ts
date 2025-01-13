import * as express from 'express'
import * as controller from '../controllers/userController'

const router: express.Router = express.Router()

router.route('/')
    .post(controller.createUser)

// router.route('/search')
//     .get(controller.findMoviesByActorAndYearRange)

router.route('/:id')
    .get(controller.getUserByUsername)
    .put(controller.updateUser)
    // .delete(controller.deleteMovie)

export default router