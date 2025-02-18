import { check, validationResult } from 'express-validator';

export const validateJob = [
  // Consignee details
  check('consigneeDetails.consigneeId').isMongoId().withMessage('Consignee ID must be a valid ObjectId'),
  check('consigneeDetails.consigneeName').notEmpty().withMessage('Consignee name is required'),

  // Consigner details
  check('consignerDetails.consignerId').isMongoId().withMessage('Consigner ID must be a valid ObjectId'),
  check('consignerDetails.consignerName').notEmpty().withMessage('Consigner name is required'),

  // Billing details
  check('billingDetails.billingAddress').notEmpty().withMessage('Billing address is required'),
  check('billingDetails.billingContact').notEmpty().withMessage('Billing contact is required'),

  // Job information
  check('jobInformation.containerType').notEmpty().withMessage('Container type is required'),
  check('jobInformation.weight').isFloat({ gt: 0 }).withMessage('Weight must be a positive number'),
  check('jobInformation.status').isIn(['pending', 'completed', 'in-progress']).withMessage('Invalid job status'),

  // Date and Time details
  check('dateAndTime.getOutTime').isISO8601().withMessage('Get-out time must be a valid date'),
  check('dateAndTime.estimatedArrivalTime').isISO8601().withMessage('Estimated arrival time must be a valid date'),

  // Location details
  check('locationDetails.loadingPortAirport').notEmpty().withMessage('Loading port or airport is required'),
  check('locationDetails.finalDestination').notEmpty().withMessage('Final destination is required'),

  // Additional information
  check('additionalInformation.commodityName').notEmpty().withMessage('Commodity name is required'),

  // Product details validation
  check('productDetails').isArray().withMessage('Product details must be an array'),
  check('productDetails.*.productId').isMongoId().withMessage('Product ID must be a valid ObjectId'),
  check('productDetails.*.productQuantity').isInt({ min: 1 }).withMessage('Product quantity must be a positive integer'),
  check('productDetails.*.productPrice').isFloat({ gt: 0 }).withMessage('Product price must be a positive number'),

  // Created By
  check('createdBy').isMongoId().withMessage('Created by must be a valid ObjectId'),

  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
