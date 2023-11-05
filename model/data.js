const axios = require("axios");
const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_cZCKSIEWcAqRpD",
  key_secret: "OrKwyjpq87aLgDQsgN4JVGhj",
});

exports.getData = (req, res) => {
  try {
    console.log("request>>>>>>>>>>>>>>>>.", req.header("Origin"));
    const q = req.query.q;
    const appId = "a7f246f2";
    const appKey = "2e8fd56ee4db42db1f0179d06a12b3cf";

    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${appId}&app_key=${appKey}`
      )
      .then(function (response) {
        res.send({
          statusCode: 200,
          error: false,
          message: "Fetched  Successfully",
          data: response.data.hits,
        });
      })
      .catch(function (error) {
        // handle error
        console.error(error);
        res.status(500).send("An error occurred"); // Send an error response
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred"); // Send an error response
  }
};
exports.getOrder = (req, res) => {
  try {
    console.log(req.body);

    const options = {
      amount: Number(req.body.price) * 100, // amount == Rs 10
      currency: req.body.currency,
      receipt: req.body.itemName,
      payment_capture: 0,
      // 1 for automatic capture // 0 for manual capture
    };
    instance.orders.create(options, async function (err, order) {
      console.log(order);
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      // return res.status(200).json(order);
      return res.redirect(order);
    });
  } catch (e) {
    return res.send(501).json(e);
  }
};
// module.exports = [getData, getOrder];
