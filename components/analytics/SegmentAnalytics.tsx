import Script from "next/script";

/**
 * Segment analytics snippet.
 *
 * Renders the official Segment `analytics.js` loader with our write key. The
 * only event fired automatically is `analytics.page()` — no user identity,
 * no personal data, no form-field tracking. That matches Publishd's brand
 * privacy principle ("customers stay anonymous by default").
 *
 * Trustpilot's Segment destination picks up the server-side
 * `Order Completed` event fired from `app/api/stripe-webhook/route.ts`
 * after a successful checkout and sends the review invite to the
 * customer's email. No browser-side purchase events needed.
 *
 * The write key is public by design — browser analytics SDKs always expose
 * their key in the network tab. Overridable via `NEXT_PUBLIC_SEGMENT_WRITE_KEY`
 * for preview environments.
 */

const FALLBACK_WRITE_KEY = "xX6JHkThZ29NmAnlnA4ruPJJF4N5xgaT";

export function SegmentAnalytics() {
  const writeKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY ?? FALLBACK_WRITE_KEY;

  const snippet = `
!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/"+key+"/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey=${JSON.stringify(writeKey)};analytics.SNIPPET_VERSION="5.2.0";
analytics.load(${JSON.stringify(writeKey)});
analytics.page();
}}();
`;

  return (
    <Script id="segment-analytics" strategy="afterInteractive">
      {snippet}
    </Script>
  );
}

export default SegmentAnalytics;
