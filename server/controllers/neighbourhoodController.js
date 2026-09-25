/**
 * GridSense AI - Multi-Neighbourhood & Map Controller
 */

const { firestoreStore } = require("../config/firebase");

exports.getAllNeighbourhoods = (req, res, next) => {
  try {
    const list = firestoreStore.neighbourhoods.map(n => ({
      id: n.id,
      name: n.name,
      feederId: n.feederId,
      households: n.households,
      currentDemand: n.currentDemand,
      currentRenewable: n.currentRenewable,
      gap: n.gap,
      batterySOC: n.batterySOC,
      flexibleLoadKW: n.flexibleLoadKW,
      riskLevel: n.riskLevel,
      feederStress: n.feederStress,
      position: n.position
    }));
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
};

exports.getNeighbourhoodById = (req, res, next) => {
  try {
    const { id } = req.params;
    const item = firestoreStore.neighbourhoods.find(n => n.id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Neighbourhood not found" });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};
