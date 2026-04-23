package main

import (
    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    app.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "status": "UP",
            "service": "product-service",
        })
    })

    app.Get("/products", func(c *fiber.Ctx) error {
        return c.JSON([]fiber.Map{
            {"id": "1", "name": "Cloud Controller", "price": 299.0},
            {"id": "2", "name": "Metric Aggregator", "price": 49.0},
        })
    })

    app.Listen(":8080")
}
