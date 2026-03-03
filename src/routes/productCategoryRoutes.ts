import { Router } from 'express'
import { ProductCategoryController } from '../controllers/ProductCategoryController'
import { ProductCategoryService } from '../services/ProductCategoryService'
import { ProductCategoryRepository } from '../repositories/ProductCategoryRepository'

const router = Router()

const productCategoryRepository = new ProductCategoryRepository()
const productCategoryService = new ProductCategoryService(
    productCategoryRepository
)
const productCategoryController = new ProductCategoryController(
    productCategoryService
)

/**
 * @openapi
 * /api/product-categories:
 *   get:
 *     tags:
 *       - Product Categories
 *     summary: Get all product categories
 *     description: Retrieve a paginated list of product categories.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of product categories to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of product categories to skip
 *     responses:
 *       200:
 *         description: A list of product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCategory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', productCategoryController.getAll)

/**
 * @openapi
 * /api/product-categories/{id}:
 *   get:
 *     tags:
 *       - Product Categories
 *     summary: Get a product category by ID
 *     description: Retrieve a single product category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product category ID
 *     responses:
 *       200:
 *         description: The product category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', productCategoryController.getById)

/**
 * @openapi
 * /api/product-categories:
 *   post:
 *     tags:
 *       - Product Categories
 *     summary: Create a new product category
 *     description: Create a new product category with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductCategoryInput'
 *     responses:
 *       201:
 *         description: The created product category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
router.post('/', productCategoryController.create)

/**
 * @openapi
 * /api/product-categories/{id}:
 *   put:
 *     tags:
 *       - Product Categories
 *     summary: Update a product category
 *     description: Update an existing product category by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductCategoryInput'
 *     responses:
 *       200:
 *         description: The updated product category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Validation error or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Product category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', productCategoryController.update)

/**
 * @openapi
 * /api/product-categories/{id}:
 *   delete:
 *     tags:
 *       - Product Categories
 *     summary: Delete a product category
 *     description: Delete a product category by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product category ID
 *     responses:
 *       200:
 *         description: The deleted product category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       400:
 *         description: Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', productCategoryController.delete)

export default router
