/* ==========================================================================
   PROJECT DATA — the ONLY place project information lives.
   The home page, the Projects page (cards, search, filters) and every
   project detail page are all built from this list.

   To ADD a project:
     1. Copy an object below and give it a new unique "id" (lowercase, dashes).
     2. Copy the folder  projects/brew-haven  to  projects/<new-id>
        and change data-id, <title>, description and URLs in its index.html.
     3. Add the page to sitemap.xml.
   Leave url / github / demo as "" if you do not have them: empty links
   are never shown on the site.
   ========================================================================== */
window.PROJECTS = [
    {
        id: "brew-haven",
        name: "Digital Marketing Campaign: Brew Haven",
        category: "Graphic Design",
        type: "Digital Marketing",
        description: "Promotional graphics for a seasonal Pumpkin Spice Latte, adapted across a landing page, newsletter, social media post and banner ads.",
        year: "2026",
        technologies: ["Canva", "Adobe Photoshop"],
        image: "assets/ba.png",
        imageAlt: "Brew Haven banner ad: Pumpkin Spice Latte with a cup illustration on a cream background",
        url: "", github: "", demo: "",
        role: "Graphic Designer",
        status: "Completed",
        featured: true,
        problem: "A seasonal drink needed to look consistent and be easy to spot on every channel where customers might see it.",
        solution: "One campaign look was adapted into four formats: a landing page, a newsletter banner, a social media post and compact banner ads.",
        features: [
            "Landing page with a clear Order Now call-to-action",
            "Newsletter banner for email campaigns",
            "Square social media post",
            "Banner ads for third-party websites"
        ],
        gallery: [
            { image: "assets/lp.png", alt: "Brew Haven landing page with the headline Pumpkin Spice Latte and an Order Now button on orange", title: "Landing Page", text: "The primary web destination designed to drive immediate sales." },
            { image: "assets/nh.png", alt: "Wide newsletter banner for the Pumpkin Spice Latte with the tagline Cozy Season Starts Here", title: "Newsletter Graphics", text: "A wide, elegant banner designed to fit seamlessly into email campaigns." },
            { image: "assets/smp.png", alt: "Square social media post reading NEW! Try our new Pumpkin Spice Latte", title: "Social Media Post", text: "A bold, scroll-stopping square graphic optimized for Instagram." },
            { image: "assets/ba.png", alt: "Compact banner ad with the line Try it today", title: "Banner Ad", text: "Compact, recognizable web banners for third-party websites." }
        ]
    },
    {
        id: "jc-silver",
        name: "Personal Brand Identity: JC x Silver",
        category: "Graphic Design",
        type: "Branding",
        description: "A modern, minimalist logo system exploring monochromatic values and versatile badge variations.",
        year: "2026",
        technologies: ["Adobe Illustrator", "Canva"],
        image: "assets/horizontal.png",
        imageAlt: "JC x Silver horizontal logo in black and silver lettering on white",
        url: "", github: "", demo: "",
        role: "Brand Designer",
        status: "Completed",
        featured: true,
        problem: "A personal brand needed a recognizable identity that works on screens, documents and small profile pictures.",
        solution: "A black, white and silver logo system with a monogram, badge, vertical and horizontal lockups.",
        features: [
            "JC monogram icon",
            "Badge variation for profile pictures and stamps",
            "Vertical and horizontal logo lockups",
            "Monochromatic brand palette"
        ],
        gallery: [
            { image: "assets/icon.png", alt: "JC monogram in black with a soft grey shadow", title: "Icon & Monogram", text: "A clean, minimalist \"JC\" monogram serving as the core icon." },
            { image: "assets/badge.png", alt: "JC x Silver stacked inside a rounded black badge outline", title: "Badge Design", text: "An enclosed, badge-style variation of the logo." },
            { image: "assets/brandmood.png", alt: "Brand sheet listing the colors black, white and silver, a monospaced typeface and the design style Modern and Minimal", title: "Brand Mood & Palette", text: "A strictly monochromatic visual identity utilizing Black, White, and Silver." },
            { image: "assets/vertical.png", alt: "JC x Silver logo with the three elements stacked vertically", title: "Vertical Logo", text: "A stacked element variation designed for centered layouts." },
            { image: "assets/horizontal.png", alt: "JC x Silver logo with the elements side by side", title: "Horizontal Logo", text: "The primary side-by-side logo lockup." }
        ]
    },
    {
        id: "unbound",
        name: "Typographic Brand Poster: UNBOUND",
        category: "Graphic Design",
        type: "Poster",
        description: "A brand identity poster using only typography and layout to convey a sense of adventure and movement.",
        year: "2026",
        technologies: ["Adobe Illustrator", "Adobe Photoshop"],
        image: "assets/unbound.png",
        imageAlt: "UNBOUND, The Expedition: a typography-only poster with a large purple wordmark on white",
        url: "", github: "", demo: "",
        role: "Graphic Designer",
        status: "Completed",
        featured: true,
        problem: "Show adventure and movement for a brand without using any photos or illustrations.",
        solution: "Font pairing, strong visual hierarchy and contrasting scale carry the whole poster.",
        features: [
            "Typography-only design",
            "Font pairing",
            "Clear visual hierarchy",
            "Contrasting scale"
        ],
        gallery: [
            { image: "assets/unbound.png", alt: "UNBOUND, The Expedition: large purple serif wordmark with a small italic subtitle and a line of small text beneath", title: "Typography & Hierarchy", text: "A brand identity poster utilizing strictly typography and layout." }
        ]
    },
    {
        id: "orange-slice",
        name: "Color & Form Study: Orange Slice",
        category: "Illustration",
        type: "Traditional Art",
        description: "Traditional illustration focusing on color blending, shading, and texture to build a 3D form.",
        year: "2026",
        technologies: ["Colored Pencils", "Markers"],
        image: "assets/orange.jpg",
        imageAlt: "Hand-drawn orange slice with blended orange tones on a bordered sheet with a title block",
        url: "", github: "", demo: "",
        role: "Illustrator",
        status: "Completed",
        featured: false,
        problem: "Practice showing a realistic 3D form on a flat surface using only the elements of design.",
        solution: "A study of an orange slice that uses color blending, shading and texture to create depth.",
        features: [
            "Color blending",
            "Shading and texture",
            "3D form on a 2D surface"
        ],
        gallery: [
            { image: "assets/orange.jpg", alt: "Hand-drawn orange slice with blended orange tones on a bordered sheet with a title block", title: "Color & Form Study", text: "A traditional illustration focusing heavily on the elements of design." }
        ]
    }
];
