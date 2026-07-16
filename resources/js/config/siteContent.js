/**
 * ───────────────────────────────────────────────────────────────────────────
 * SITE CONTENT — single source of truth for all editable template copy.
 * ───────────────────────────────────────────────────────────────────────────
 *
 * This file holds every piece of text shown on the public site (home, about,
 * projects, contact). When fulfilling a client order, edit the values here —
 * you should not need to touch the .vue components for copy changes.
 *
 * Everything below is a GENERIC PLACEHOLDER. Replace each value with the
 * client's real content. Images are handled separately (in the components).
 */
export default {
    // ── Brand / project identity ────────────────────────────────────────────
    brand: {
        name: 'Your Project',       // full project name (hero, footer, menu)
        short: 'YP',                // logo shorthand shown in the nav
        tagline1: 'Your',           // hero tagline, line 1
        tagline2: 'Tagline',        // hero tagline, line 2
    },

    // Partner / developer logos shown in the home hero. Add or remove freely.
    partners: [
        { name: 'YOUR COMPANY', sub: 'DEVELOPER' },
        { name: 'PARTNER CO.', sub: '' },
    ],

    // ── Navigation ───────────────────────────────────────────────────────────
    nav: {
        // Full-screen overlay menu items.
        menuItems: [
            { n: '01', label: 'Home', href: '/' },
            { n: '02', label: 'Projects', href: '/projects' },
            { n: '03', label: 'About', href: '/about' },
            { n: '04', label: 'Contact', href: '/contact' },
        ],
        menuCta: 'See Apartments',
        menuCtaHref: '/project360/1',
    },

    // ── Contact details (used on the contact page + menus) ───────────────────
    contact: {
        email: 'sales@yourcompany.com',
        phone: '+00 000 000 000',
        addressLines: ['Your Street 00', '00000 Your City', 'Your Country'],
        hoursWeekday: 'Mon — Fri · 9:00 — 18:00',
        hoursWeekend: 'Sat · by appointment',
    },

    social: {
        facebook: '#',
        instagram: '#',
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
        heading: 'Developer',
        companies: [
            {
                name: 'Your Company',
                addressLines: ['Your Street 00', '00000 Your City'],
                email: 'sales@yourcompany.com',
            },
            {
                name: 'Partner Co.',
                addressLines: ['Partner Street 00', '00000 Your City'],
                email: 'sales@partner.com',
            },
        ],
        legalLinks: 'Terms of use · Privacy policy · Cookie policy',
        credit: 'Designed & Created — Your Company',
        copyright: '© 2026 Your Company. All rights reserved.',
    },

    // ── Key figures (shared by the home + about pages) ───────────────────────
    // `count` items animate up from 0 — keep them numeric.
    // `value` items are shown as-is (text).
    stats: [
        { label: 'Apartments', count: 100 },
        { label: 'Penthouses', count: 10 },
        { label: 'Sales launch', value: '0Q 0000' },
        { label: 'Completion', value: '0Q 0000' },
    ],

    // ── HOME PAGE ────────────────────────────────────────────────────────────
    home: {
        prestige: {
            headline: ['A new', 'prestigious', 'address'],
            body: [
                'Introduce your flagship development here — where it sits, the character of its surroundings, and the vision behind it. Describe the kind of living it offers and what makes the location distinctive.',
                'Name the people behind the project — the developer and any partners — and the experience and ambition they bring.',
                'Close with a short, memorable line that captures the spirit of the project.',
            ],
            cta: 'Choose your apartment',
        },
        parallax: {
            title: ['A standout development', 'in a remarkable location'],
            imageAlt: 'Your city',
        },
        marquee: 'Your headline statement —',
        split1: {
            subtitle: 'Panoramic views',
            title: 'A defining feature',
            body: 'Describe a signature feature of the project — the premium residences, the views, the materials, or the design language. Use this space to convey the level of quality and the experience of living here.',
        },
        split2: {
            subtitle: 'For every lifestyle',
            title: 'Residences',
            body: 'Describe the range of homes on offer — from compact apartments to larger family residences — and who they suit. Mention the build quality, the amenities, and the qualities that make this development feel like home.',
            linkText: 'Choose your apartment',
        },
        geniusLoci: { word1: 'Stories', word2: 'Your keyword' },
    },

    // ── ABOUT PAGE ───────────────────────────────────────────────────────────
    about: {
        hero: {
            label: 'About the project',
            title: ['A symphony', 'of living'],
        },
        vision: {
            label: '01 — The vision',
            body: 'Summarise the vision behind the project in one or two sentences — the location, its character, and the experience it aims to create.',
        },
        statsHeadline: ['By the', 'numbers'],
        marquee: 'Designed by Your Architecture Studio  ·',
        split: {
            label: '02 — Architecture',
            title: 'Composed in detail',
            body: 'Describe the architectural approach — the studio behind it, the layouts, the materials, and the standard of finish. Convey the care and quality that define every home.',
        },
        developers: {
            headline: 'The makers',
            items: [
                {
                    name: 'Your Company',
                    description: 'Describe the lead developer — their experience, reputation, and the kind of projects they are known for.',
                },
                {
                    name: 'Partner Co.',
                    description: 'Describe the partner or co-developer — their specialism and what they bring to the project.',
                },
            ],
        },
        quote: {
            text: '"Add a memorable quote that captures the spirit of the project."',
            attribution: 'Your Company & Partner Co.',
        },
        cta: {
            headline: 'Find your home',
            linkText: 'Choose your apartment',
            linkHref: '/#rezidence',
        },
    },

    // ── PROJECTS PAGE ────────────────────────────────────────────────────────
    projects: {
        header: {
            label: 'Selected work — 0000 / 0000',
            title: 'Projects',
        },
        filters: [
            { label: 'All', value: 'all' },
            { label: 'Residential', value: 'residential' },
            { label: 'Office & Retail', value: 'commercial' },
        ],
        list: [
            { id: 1, num: '01', name: 'Project One', location: 'Your City — District', year: '2026', cat: 'residential', href: '/', img: 0 },
            { id: 2, num: '02', name: 'Project Two', location: 'Your City — District', year: '2026', cat: 'residential', href: '#', img: 1 },
            { id: 3, num: '03', name: 'Project Three', location: 'Your City — District', year: '2026', cat: 'commercial', href: '#', img: 2 },
        ],
        featured: {
            headline: 'Featured',
            items: [
                { name: 'Project One', meta: 'Residential · 0000', href: '/', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop' },
                { name: 'Project Two', meta: 'Residential · 0000', href: '#', img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop' },
            ],
        },
        cta: {
            headline: 'Start a conversation',
            linkText: 'Contact sales',
            linkHref: 'mailto:sales@yourcompany.com',
        },
    },

    // ── CONTACT PAGE ─────────────────────────────────────────────────────────
    contact_page: {
        hero: {
            label: 'Get in touch',
            title: ["Let's talk", 'about home'],
        },
        office: {
            label: '01 — Sales office',
            heading: 'Visit us',
            addressLabel: 'Address',
            emailLabel: 'Email',
            phoneLabel: 'Phone',
            hoursLabel: 'Opening hours',
        },
        form: {
            label: '02 — Send a message',
            nameLabel: 'Name',
            namePlaceholder: 'Your full name',
            emailLabel: 'Email',
            emailPlaceholder: 'you@example.com',
            phoneLabel: 'Phone',
            phoneOptional: '(optional)',
            phonePlaceholder: '+00 000 000 000',
            messageLabel: 'Message',
            messagePlaceholder: 'Tell us a little about what you’re looking for…',
            submit: 'Send message',
            successHeading: 'Thank you',
            successBody: 'Your message has been received. Our sales team will be in touch with you shortly.',
        },
    },
}
