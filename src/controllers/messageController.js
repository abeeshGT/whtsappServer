const { default: axios } = require("axios");
const whatsappService = require("../services/whatsappService");

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
};
