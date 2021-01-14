const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

export class PaypalClient {
  private readonly payPalClient: any;

  constructor() {
    const clientId = "ARYcMr3L4M45NuTNriN6K2-wfkjPeyCLNdmps60lXPaGzF5fJW2wxlY63pnA8l34RizUDP70EuwZ5z37";
    const secretId = "EDqgvlC3cnMgxMbLpB2Cd7gi8ctSIrhtgxD9kILUVio3JHYtimg5oqgKOszfOoKo7F34ceYhqYYWt7S7";

    this.payPalClient = new checkoutNodeJssdk.core.PayPalHttpClient(
      new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId,
        secretId
      )
    );
  }

  async getOrder(orderId: string) {
    const orderRequest = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);
    const order = await this.payPalClient.execute(orderRequest);
    return order;
  }
}