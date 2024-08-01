const { default: axios } = require("axios");
const whatsappService = require("../services/whatsappService");

const verifyToken = async (req, res) => {
   const token = "whatsappcrm";
   console.log(req.query);
   console.log(JSON.stringify(req.query));
   // Extract query parameters using bracket notation
   const hub_mode = req.query["hub.mode"];
   const hub_challenge = req.query["hub.challenge"];
   const hub_verify_token = req.query["hub.verify_token"];

   if (hub_verify_token === token) {
      res.status(200).send(hub_challenge);
   } else {
      res.status(403).send("Invalid verify token");
   }
};

const chatBoatApi = async (chat_boat_url, body) => {
   try {
      // Redirecting the message from webhooks to the associated chatboat api if chat boat url is exist

      const response = await axios.post(chat_boat_url, body);
      console.log(response?.data);
   } catch (err) {
      console.log(err);
   }
};

/**
 * Function to receive all webhooks calls
 * And redirect this api call to the associated client using their url
 */

const receiveWebhooks = async (req, res) => {
   try {
      console.log("hit the route");
      console.log(JSON.stringify(req.body));
      const { entry } = req.body;
      const { id } = entry[0];

      //Find the whatsapp user with the whatsapp business id
      const whatsappUser = await whatsappService.getWhatsappUserByWabaId(id);

      console.log({ whatsappUser });

      //If no user exist return
      if (!whatsappUser) return res.send("Could not find the whatsapp user");

      const { app_url, chat_boat_url } = whatsappUser;
      console.log(app_url);

      console.log({ chat_boat_url });
      if (chat_boat_url) {
         chatBoatApi(chat_boat_url, req.body);
         console.log("api called");
      }

      // Redirecting the received msg from webhooks to the associated whatsapp user
      const response = await axios.post(app_url, req.body);
      console.log(response?.data);

      if (response)
         res.status(200).send("Api is redirected to the associated client");
   } catch (err) {
      console.log(err);
   }
};

const receiveMessage = async (req, res) => {
   try {
      const verificationToken = req.body.verifyToken;

      // Find user by verification token

      const whatsappUser = await whatsappService.getWhatsappUserById(
         verificationToken
      );
      // Function to  redirect the  webhooks response to appropriate user route

      if (!whatsappUser)
         return res.status(400).json({ message: "Could not find the user" });

      const { app_url, accessToken } = whatsappUser;

      const response = await axios.post(app_url, req.body);

      if (response) {
         res.status(200).json({
            status: "success",
            message: "message redirected successfully",
         });
      }

      const sampl = {
         object: "whatsapp_business_account",
         entry: [
            {
               id: "8856996819413533",
               changes: [
                  {
                     value: {
                        messaging_product: "whatsapp",
                        metadata: {
                           display_phone_number: "16505553333",
                           phone_number_id: "27681414235104944",
                        },
                        contacts: [
                           {
                              profile: {
                                 name: "Kerry Fisher",
                              },
                              wa_id: "16315551234",
                           },
                        ],
                        messages: [
                           {
                              from: "16315551234",
                              id: "wamid.ABGGFlCGg0cvAgo-sJQh43L5Pe4W",
                              timestamp: "1603059201",
                              text: {
                                 body: "Hello this is an answer",
                              },
                              type: "text",
                           },
                        ],
                     },
                     field: "messages",
                  },
               ],
            },
         ],
      };

      const messageObj = req.body;
      const entry = messageObj.entry[0];
   } catch (err) {
      console.log(err);
      res.status(400).json({ status: "fail", message: err });
   }
};

module.exports = {
   receiveMessage,
   verifyToken,
   receiveWebhooks,
};
