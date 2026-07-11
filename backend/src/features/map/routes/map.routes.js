const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/map.controller');
const validate = require('../validations/map.validation');

function query(fn) {
  return (req, res, next) => {
    const errors = fn(req.query);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

function param(fn, name) {
  return (req, res, next) => {
    const error = fn(req.params[name]);
    if (error) {
      return res.status(400).json({ success: false, errors: [error] });
    }
    next();
  };
}

// ─── Crime Reports ──────────────────────────────────────────────────────────────

router.get('/', ctrl.getAllReports);
router.get('/reports/:id', param(validate.validateId, 'id'), ctrl.getReportById);

// ─── Markers ────────────────────────────────────────────────────────────────────

router.get('/markers', ctrl.getMarkers);

// ─── Nearby ─────────────────────────────────────────────────────────────────────

router.get('/nearby', query(validate.validateNearby), ctrl.getNearby);

// ─── Heatmap ────────────────────────────────────────────────────────────────────

router.get('/heatmap', query(validate.validateHeatmap), ctrl.getHeatmap);

// ─── Clusters ───────────────────────────────────────────────────────────────────

router.get('/clusters', query(validate.validateClusters), ctrl.getClusters);

// ─── Search ─────────────────────────────────────────────────────────────────────

router.get('/search', query(validate.validateSearch), ctrl.search);

// ─── Filter Options ─────────────────────────────────────────────────────────────

router.get('/filters', ctrl.getFilters);

module.exports = router;
