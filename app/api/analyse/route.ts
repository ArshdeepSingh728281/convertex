import { NextRequest, NextResponse } from "next/server"
import { getWebData } from "../pipeline/getwebdata"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: "URL required" },
        { status: 400 }
      )
    }

    const data = await getWebData(url)

    console.log("===== LANDING PAGE ANALYSIS =====")
    console.log("Request Info:", data.request)
    console.log("Timing:", data.timing)
    console.log("Resources Loaded:", data.resources?.length)
    console.log("Page Analysis:", data.analysis)
    console.log("Raw HTML Length:", data.html?.raw?.length)
    console.log("Rendered HTML Length:", data.html?.rendered?.length)

    console.log("Headlines:", data.analysis?.headlines)
    console.log("Paragraphs:", data.analysis?.paragraphs)
    console.log("Links:", data.analysis?.links)
    console.log("Forms:", data.analysis?.forms)
    console.log("CTA Buttons:", data.analysis?.cta_buttons)
    console.log("Testimonials:", data.analysis?.testimonials)
    console.log("Pricing Sections:", data.analysis?.pricing_sections)
    console.log("Images:", data.analysis?.images)

    console.log("Assets:", data.analysis)
    console.log("Performance:", data.analysis?.performance)

    console.log("Screenshot size (base64):", data.screenshot?.length)

    const filePath = path.join(process.cwd(), "test-screenshot.png")
    fs.writeFileSync(
    filePath,
    Buffer.from(data.screenshot, "base64")
    )


    console.log("===== END ANALYSIS =====")

    return NextResponse.json({
      success: true,
      ...data
    })

  } catch (error) {
    console.error("API Error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}