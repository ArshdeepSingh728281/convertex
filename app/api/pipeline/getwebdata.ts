import { chromium } from "playwright"
import axios from "axios"

export async function getWebData(url: string) {

  /* -----------------------
     RAW HTTP REQUEST
  ----------------------- */

  const requestStart = Date.now()

  const response = await axios.get(url, {
    timeout: 60000,
    validateStatus: () => true
  })

  const requestTime = Date.now() - requestStart

  const rawHTML = response.data
  const headers = response.headers
  const status = response.status
  const responseSize = Buffer.byteLength(rawHTML, "utf8")



  /* -----------------------
     PLAYWRIGHT BROWSER
  ----------------------- */

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  const resources: any[] = []

  page.on("response", async (res) => {
    try {
      resources.push({
        url: res.url(),
        status: res.status(),
        type: res.request().resourceType()
      })
    } catch {}
  })



  const renderStart = Date.now()

  await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 60000
  })

  const renderTime = Date.now() - renderStart



  /* -----------------------
     PAGE ANALYSIS
  ----------------------- */

  const analysis = await page.evaluate(() => {

    const getRect = (el: Element) => {
      const r = el.getBoundingClientRect()
      return {
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height
      }
    }



    const headlines = Array.from(document.querySelectorAll("h1,h2,h3")).map(el => ({
      text: el.textContent?.trim(),
      position: getRect(el)
    }))

    const paragraphs = Array.from(document.querySelectorAll("p")).map(el => ({
      text: el.textContent?.trim(),
      position: getRect(el)
    }))

    const links = Array.from(document.querySelectorAll("a")).map(el => ({
      text: el.textContent?.trim(),
      href: el.href
    }))

    const forms = Array.from(document.querySelectorAll("form")).map(form => ({
      position: getRect(form),
      inputs: Array.from(form.querySelectorAll("input")).map(input => ({
        type: input.type,
        name: input.name,
        placeholder: input.placeholder
      }))
    }))

    const cta_buttons = Array.from(document.querySelectorAll("button,a"))
      .filter(el => {
        const text = el.textContent?.toLowerCase() || ""
        return (
          text.includes("start") ||
          text.includes("buy") ||
          text.includes("try") ||
          text.includes("sign up") ||
          text.includes("get") ||
          text.includes("book") ||
          text.includes("demo")
        )
      })
      .map(el => ({
        text: el.textContent?.trim(),
        position: getRect(el)
      }))

    const images = Array.from(document.querySelectorAll("img")).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.width,
      height: img.height,
      position: getRect(img)
    }))

    const scripts = Array.from(document.querySelectorAll("script"))
      .map(s => (s as HTMLScriptElement).src)
      .filter(Boolean)

    const stylesheets = Array.from(
      document.querySelectorAll("link[rel='stylesheet']")
    ).map(s => (s as HTMLLinkElement).href)



    const testimonials = Array.from(
      document.querySelectorAll('[class*="testimonial"],[class*="review"]')
    ).map(el => el.textContent?.trim())



    const pricing_sections = Array.from(
      document.querySelectorAll('[class*="pricing"],[class*="price"]')
    ).map(el => el.textContent?.trim())



    const hero = document.querySelector("h1")



    const perf = performance as any
    const nav = perf.getEntriesByType("navigation")[0]



    const dom_nodes = document.querySelectorAll("*").length
    const scriptCount = document.querySelectorAll("script").length
    const imageCount = document.querySelectorAll("img").length



    return {
      title: document.title,
      hero_text: hero?.textContent?.trim() || "",

      headlines,
      paragraphs,
      links,
      forms,
      cta_buttons,

      testimonials,
      pricing_sections,

      images,

      assets: {
        scripts,
        stylesheets
      },

      performance: {
        dom_nodes,
        scripts: scriptCount,
        images: imageCount,
        load_time: nav?.loadEventEnd || 0,
        dom_content_loaded: nav?.domContentLoadedEventEnd || 0
      }
    }
  })



  /* -----------------------
     HTML AFTER JS
  ----------------------- */

  const renderedHTML = await page.content()



  /* -----------------------
     SCREENSHOT
  ----------------------- */

  const screenshot = await page.screenshot({
    fullPage: true
  })



  await browser.close()



  /* -----------------------
     FINAL RETURN
  ----------------------- */

  return {

    request: {
      status,
      headers,
      requestTime,
      responseSize
    },

    html: {
      raw: rawHTML,
      rendered: renderedHTML
    },

    timing: {
      network_request_time: requestTime,
      render_time: renderTime
    },

    resources,

    analysis,

    screenshot: screenshot.toString("base64")
  }
}