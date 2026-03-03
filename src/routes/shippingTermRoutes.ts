import { Router } from 'express'
import { ShippingTermController } from '../controllers/ShippingTermController'
import { ShippingTermService } from '../services/ShippingTermService'
import { ShippingTermRepository } from '../repositories/ShippingTermRepository'

const router = Router()

const shippingTermRepository = new ShippingTermRepository()
const shippingTermService = new ShippingTermService(shippingTermRepository)
const shippingTermController = new ShippingTermController(
    shippingTermService
)

/**
 * @openapi
 * /api/shipping-terms:
 *   get:
 *     tags:
 *       - Shipping Terms
 *     summary: Get all shipping terms
 *     description: Retrieve a paginated list of shipping terms.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of shipping terms to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of shipping term to skip
 *     responses:
 *       200:
 *         description: A list of shipping term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShippingTerms'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', shippingTermController.getAll)

/**
 * @openapi
 * /api/shipping-term/{code}:
 *   get:
 *     tags:
 *       - Shipping Terms
 *     summary: Get shipping term by code
 *     description: Retrieve a single shipping term by its code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping term code
 *     responses:
 *       200:
 *         description: The shipping term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingTerms'
 *       400:
 *         description: Code parameter is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Shipping term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:code', shippingTermController.getByCode)

/**
 * @openapi
 * /api/shipping-term:
 *   post:
 *     tags:
 *       - Shipping Terms
 *     summary: Create a new shipping term
 *     description: Create a new shipping term with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateShippingTermsInput'
 *     responses:
 *       201:
 *         description: The created shipping term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingTerm'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
router.post('/', shippingTermController.create)

/**
 * @openapi
 * /api/shipping-term/{code}:
 *   put:
 *     tags:
 *       - Shipping Terms
 *     summary: Update a shipping term
 *     description: Update an existing shipping term by code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping term code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateShippingTermsInput'
 *     responses:
 *       200:
 *         description: The updated shipping term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingTerms'
 *       400:
 *         description: Validation error or missing code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Shipping term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:code', shippingTermController.update)

/**
 * @openapi
 * /api/shipping-term/{code}:
 *   delete:
 *     tags:
 *       - Shipping Terms
 *     summary: Delete a shipping term
 *     description: Delete a shipping term by code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping term code
 *     responses:
 *       200:
 *         description: The deleted shipping term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingTerms'
 *       400:
 *         description: Missing code parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Shipping term not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:code', shippingTermController.delete)

export default router
