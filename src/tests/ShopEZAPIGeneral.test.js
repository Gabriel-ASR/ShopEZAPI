const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
const JWT = require("jsonwebtoken");

var userId;
var cartId;
let productId;
let testToken;

describe("Testes ShopEz API", () => {
  describe("Testes das rotas de usuário", () => {
    test("Deve retornar 422 e uma mensagem em JSON no POST /cadastrar", async () => {
      const response = await request
        .post("/cadastrar")
        .send({ email: "gabriel04asr@gmail.com" });
      expect(response.status).toBe(422);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 201 e o corpo do usuário criado em JSON no POST /cadastrar", async () => {
      const response = await request
        .post("/cadastrar")
        .send({ email: "gabriel04asr@gmail.com", password: "senhateste123" });
      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      userId = response.body._id;
      testToken = JWT.sign(
        { email: "gabriel04asr@gmail.com", id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "2m" }
      );
    });

    test("Deve retornar 200 e o corpo de um usuário em JSON no GET /usuarios/:userId", async () => {
      const response = await request.get(`/usuarios/${userId}`);
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e uma mensagem em JSON no GET /usuarios/:userId", async () => {
      const response = await request.get(`/usuarios/665bbc2b2d9ea278f4e40f9`);
      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 404 e uma mensagem em JSON no GET /usuarios/:userId", async () => {
      const response = await request.get(`/usuarios/665bbc2b2d9ea278f4e40f9b`);
      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e uma mensagem em JSON no PUT /usuarios/:userId", async () => {
      const response = await request
        .put(`/usuarios/${userId}`)
        .set("Authorization", testToken)
        .send({ password: "senhateste321" });
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e uma mensagem em JSON no PUT /usuarios/:userId", async () => {
      const response = await request
        .put(`/usuarios/665bbc2b2d9ea278f4e40f9`)
        .set("Authorization", testToken)
        .send({ password: "senhateste400" });
      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 404 e uma mensagem em JSON no PUT /usuarios/:userId", async () => {
      const response = await request
        .put(`/usuarios/665bbc2b2d9ea278f4e40f9b`)
        .set("Authorization", testToken)
        .send({ password: "senhateste404" });
      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
    });
  });

  describe("Testes das rotas de produto", () => {
    test("Deve retornar 201 e o corpo do produto criado em JSON no POST /produtos", async () => {
      const response = await request
        .post("/produtos")
        .set("Authorization", testToken)
        .send({
          name: "Monitor",
          price: 1500,
          desc: "Monitor 140hz",
          image_URL: "Imagem do monitor",
        });
      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      productId = response.body._id.toString();
    });

    test("Deve retornar 422 e uma mensagem em JSON no POST /produtos", async () => {
      const response = await request
        .post("/produtos")
        .set("Authorization", testToken)
        .send({
          name: "Monitor",
          price: 1500,
          desc: "Monitor 140hz",
        });
      expect(response.status).toBe(422);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e um array de produtos no GET /produtos", async () => {
      const response = await request.get("/produtos");
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e o corpo do produto em JSON no GET /produtos/:productId", async () => {
      const response = await request.get(`/produtos/${productId}`);
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e o corpo do produto em JSON no GET /produtos/:productId", async () => {
      const response = await request.get(`/produtos/665bbc2b2d9ea278f4e40f9`);
      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 404 e o corpo do produto em JSON no GET /produtos/:productId", async () => {
      const response = await request.get(`/produtos/665bbc2b2d9ea278f4e40f9b`);
      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e o corpo do produto em JSON no PUT /produtos/:productId", async () => {
      const response = await request
        .put(`/produtos/${productId}`)
        .set("Authorization", testToken)
        .send({
          name: "Monitor",
          price: 900,
          desc: "Monitor 140hz",
          image_URL: "Imagem do monitor",
        });
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e uma mensagem em JSON no PUT /produtos/:productId", async () => {
      const response = await request
        .put(`/produtos/665bbc2b2d9ea278f4e40f9`)
        .set("Authorization", testToken)
        .send({
          name: "Monitor",
          price: 900,
          desc: "Monitor 140hz",
          image_URL: "Imagem do monitor",
        });
      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 404 e uma mensagem em JSON no PUT /produtos/:productId", async () => {
      const response = await request
        .put(`/produtos/665bbc2b2d9ea278f4e40f9b`)
        .set("Authorization", testToken)
        .send({
          name: "Monitor",
          price: 900,
          desc: "Monitor 140hz",
          image_URL: "Imagem do monitor",
        });
      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e um array de produtos em JSON no GET /usuarios/:userId/produtos", async () => {
      const response = await request.get(`/usuarios/${userId}/produtos`);
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e um array de produtos em JSON no GET /usuarios/:userId/produtos", async () => {
      const response = await request.get(
        `/usuarios/665bbc2b2d9ea278f4e40f9/produtos`
      );
      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 404 e um array de produtos em JSON no GET /usuarios/:userId/produtos", async () => {
      const response = await request.get(
        `/usuarios/665bbc2b2d9ea278f4e40f9a/produtos`
      );
      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
    });
  });

  describe("Testes das rotas de carrinho", () => {
    test("Deve retornar 201 e o corpo do carrinho criado em JSON no POST /carrinhos", async () => {
      const response = await request
        .post("/carrinhos")
        .set("Authorization", testToken)
        .send({
          productList: [
            {
              name: "Monitor",
              price: 900,
              desc: "Monitor 140hz",
              image_URL: "Imagem do monitor",
              createdBy: userId,
            },
          ],
        });
      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      cartId = response.body._id;
    });

    test("Deve retornar 409 e uma mensagem em JSON no POST /carrinhos", async () => {
      const response = await request
        .post("/carrinhos")
        .set("Authorization", testToken)
        .send({
          productList: [
            {
              name: "Monitor",
              price: 900,
              desc: "Monitor 140hz",
              image_URL: "Imagem do monitor",
              createdBy: userId,
            },
          ],
        });
      expect(response.status).toBe(409);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e um array de carrinhos em JSON no GET /carrinhos", async () => {
      const response = await request
        .get("/carrinhos")
        .set("Authorization", testToken);
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e o corpo do carrinho em JSON no GET /carrinhos/:cartId", async () => {
      const response = await request.get(`/carrinhos/${cartId}`);
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e uma mensagem em JSON no GET /carrinhos/:cartId", async () => {
      const response = await request.get(`/carrinhos/665bbc2b2d9ea278f4e40f9`);
      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 404 e uma mensagem em JSON no GET /carrinhos/:cartId", async () => {
      const response = await request.get(`/carrinhos/665bbc2b2d9ea278f4e40f9b`);
      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e o corpo do carrinho em JSON no PUT /carrinhos/:cartId", async () => {
      const response = await request
        .get(`/carrinhos/${cartId}`)
        .set("Authorization", testToken)
        .send({ productList: [] });
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e o corpo do carrinho em JSON no PUT /carrinhos/:cartId", async () => {
      const response = await request
        .get(`/carrinhos/665bbc2b2d9ea278f4e40f9`)
        .set("Authorization", testToken)
        .send({ productList: [] });
      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 404 e o corpo do carrinho em JSON no PUT /carrinhos/:cartId", async () => {
      const response = await request
        .get(`/carrinhos/665bbc2b2d9ea278f4e40f9b`)
        .set("Authorization", testToken)
        .send({ productList: [] });
      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e o corpo do carrinho em JSON no DELETE /carrinhos/:cartId", async () => {
      const response = await request
        .delete(`/carrinhos/${cartId}`)
        .set("Authorization", testToken);
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e o corpo do carrinho em JSON no DELETE /carrinhos/:cartId", async () => {
      const response = await request
        .delete(`/carrinhos/665bbc2b2d9ea278f4e40f9`)
        .set("Authorization", testToken);
      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
    });

    test("Deve retornar 404 e o corpo do carrinho em JSON no DELETE /carrinhos/:cartId", async () => {
      const response = await request
        .delete(`/carrinhos/665bbc2b2d9ea278f4e40f9b`)
        .set("Authorization", testToken);
      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
    });
  });

  describe("Testes das rotas de autenticação", () => {
    test("Deve retornar 200 e um token em JSON no GET /renovar", async () => {
      const response = await request
        .get("/renovar")
        .set("Authorization", testToken);
      expect(response.status).toBe(200),
        expect(response.type).toBe("application/json");
    });

    test("Deve retornar 401 e uma mensagem em JSON no GET /renovar", async () => {
      const response = await request
        .get("/renovar")
        .set("Authorization", "tokeninvalido");
      expect(response.status).toBe(401),
        expect(response.type).toBe("application/json");
    });

    test("Deve retornar 400 e uma mensagem em JSON no GET /renovar", async () => {
      const response = await request.get("/renovar");
      expect(response.status).toBe(400),
        expect(response.type).toBe("application/json");
    });

    test("Deve retornar 200 e um token em JSON no POST /login", async () => {
      const response = await request
        .post("/login")
        .send({ email: "gabriel04asr@gmail.com", password: "senhateste321" });
      expect(response.status).toBe(200),
        expect(response.type).toBe("application/json");
    });
  });

  describe("Testes das rotas Delete de usuários e produtos", () => {
    describe("Testes das rotas DELETE de produtos", () => {
      test("Deve retornar 200 e o corpo do produto apagado em JSON no DELETE /produtos/:productId", async () => {
        const response = await request
          .delete(`/produtos/${productId}`)
          .set("Authorization", testToken);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
      });

      test("Deve retornar 400 e o corpo do produto apagado em JSON no DELETE /produtos/:productId", async () => {
        const response = await request
          .delete(`/produtos/665bbc2b2d9ea278f4e40f9`)
          .set("Authorization", testToken);
        expect(response.status).toBe(400);
        expect(response.type).toBe("application/json");
      });

      test("Deve retornar 404 e o corpo do produto apagado em JSON no DELETE /produtos/:productId", async () => {
        const response = await request
          .delete(`/produtos/665bbc2b2d9ea278f4e40f9b`)
          .set("Authorization", testToken);
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
      });
    });

    describe("Testes de rota DELETE de usuários", () => {
      test("Deve retornar 200 e o corpo do usuário apagado em JSON no DELETE /usuarios/:userId", async () => {
        const response = await request
          .delete(`/usuarios/${userId}`)
          .set("Authorization", testToken);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
      });
    });
  });
});
