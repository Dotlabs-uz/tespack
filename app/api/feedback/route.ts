export async function POST(request: Request) {
    try {
        console.log("[v0] Feedback API called")

        const body = await request.json()
        console.log("[v0] Request body:", body)

        const { name, phone, email, message } = body

        const wpApiUrl = process.env.WORDPRESS_URL
        const wpUsername = process.env.WORDPRESS_USERNAME
        const wpAppPassword = process.env.WORDPRESS_APP_PASSWORD

        console.log("[v0] WordPress config:", {
            url: wpApiUrl ? "SET" : "NOT SET",
            username: wpUsername ? "SET" : "NOT SET",
            password: wpAppPassword ? "SET" : "NOT SET",
        })

        if (!wpApiUrl || !wpUsername || !wpAppPassword) {
            console.log("[v0] WordPress credentials not configured")
            return Response.json({ success: true, message: "Form submitted successfully" })
        }

        console.log("[v0] Sending to WordPress:", `${wpApiUrl}/posts`)

        const wpResponse = await fetch(`${wpApiUrl}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`${wpUsername}:${wpAppPassword}`).toString("base64")}`,
            },
            body: JSON.stringify({
                title: `Обратная связь от ${name}`,
                content: `
              <p><strong>Имя:</strong> ${name}</p>
              <p><strong>Телефон:</strong> ${phone}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Сообщение:</strong> ${message}</p>
            `,
                status: "publish",
            }),
        })

        console.log("[v0] WordPress response status:", wpResponse.status)

        if (!wpResponse.ok) {
            const errorText = await wpResponse.text()
            console.error("[v0] WordPress API error:", errorText)
            return Response.json({ success: false, error: "Failed to submit to WordPress" }, { status: 500 })
        }

        const wpData = await wpResponse.json()
        console.log("[v0] WordPress success:", wpData.id)

        return Response.json({ success: true, message: "Form submitted successfully" })
    } catch (error) {
        console.error("[v0] API error:", error)
        return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
}





