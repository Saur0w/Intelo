"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./style.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

interface ImageCard {
    src: string;
    alt: string;
    tag: string;
    title: string;
}

const galleryItems: ImageCard[] = [
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-cph2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F771856575_18613208146052982_8314105499637180113_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh2.08_tt6%26_nc_cat%3D107%26ig_cache_key%3DMzk2MDgyMTE1MjIxNTM2ODA0MQ%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTYyMC5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3D9ec51grWtYIQ7kNvwH3VICr%26_nc_oc%3DAdoE2o7Z0vqHfVzuYhCzDK_q1JC3ySUYzVaTGrkP3nVJSxhL1NfIs_Qr0tWt8xKOHe96hNvuqzva7Zw5BgSyJ6ZJ%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-cph2-1.cdninstagram.com%26_nc_gid%3Dq6FG25VE_cRTO_fGftM9OQ%26_nc_ss%3D7a3ba%26oh%3D00_AQGWbzjaWcRj8Eev5rN1mWROyI8hGa1fQujDwBmgzpEOQQ%26oe%3D6A81BD66",
        alt: "Team Canyon",
        tag: "COLLECTIVE",
        title: "Integrative Guides",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Finstagram.frix7-1.fna.fbcdn.net%2Fv%2Ft51.82787-15%2F769778071_18612919516052982_7711515456977694731_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh2.08_tt6%26_nc_cat%3D101%26ig_cache_key%3DMzk2MDE0MDA4MjAyMTA1NjU3OA%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTc1NS5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3DGgP4aIZ-sUkQ7kNvwGtKgz8%26_nc_oc%3DAdqoHzQeT53WWg-zyYm0w8o7fgXfPasfF7eZP2KIMNvifrMprzA9nPadMVOYUUSc13s%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dinstagram.frix7-1.fna%26_nc_gid%3D-Mx9O00xyjcmhgbAHOA7HQ%26_nc_ss%3D7a3ba%26oh%3D00_AQE8bV5zUnvLWmaYYlAOXjgD2W2w2lbN1ns90GH1i2jChA%26oe%3D6A7F2187",
        alt: "Stay Experience",
        tag: "IMMERSION",
        title: "The Sanctuary Stay",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-cph2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F768408870_18612203419052982_2911101295529894178_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_tt6%26_nc_cat%3D102%26ig_cache_key%3DMzk1ODYzNDY0NTk1NDE1NjYyNg%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTg5MC5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3DodS1cVhH0O4Q7kNvwGcciZV%26_nc_oc%3DAdqgSOBOOQqdTJaG4qvTJ0Bdx43v_LaCpvEgWoQoQlMmVcVsaANDvth_lXNfScUBvGA%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-cph2-1.cdninstagram.com%26_nc_gid%3DgUFuraVEEptGatvb45pvHw%26_nc_ss%3D7a3ba%26oh%3D00_AQGUxOdA7P7kWaX3DfTL5PTfcV2_2QTW4MOEle1hW8fwvQ%26oe%3D6A7C9820",
        alt: "House",
        tag: "ESTATES",
        title: "Berkshire Manor",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-cph2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F761878442_18611020126052982_6403778114619868187_n.jpg%3Fstp%3Ddst-jpg_e15_s640x640_tt6%26_nc_cat%3D102%26ig_cache_key%3DMzk1NTg2NzczOTI3ODk2MDQzNDE4NjExMDIwMTIwMDUyOTgy.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjEwODAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%253D%253D%26_nc_ohc%3Dntn6_EAElkUQ7kNvwFRtYd8%26_nc_oc%3DAdqMKcXAtVkdnuDq4edv7ptHep-e63ctiMp2ZzVt6sZSusqS5GjoTe1YlGIQZw_uBLs%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-cph2-1.cdninstagram.com%26_nc_gid%3DwDvY8-5Ssvi7pXe4C5qRig%26_nc_ss%3D7a3ba%26oh%3D00_AQEO_bOKcp-PAluadkTALqBvQhBvo3siW7cQfjqjrrtUHg%26oe%3D6A774B5D",
        alt: "Summer",
        tag: "OUTDOORS",
        title: "Sonoran Court Vitality",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-cph2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F760701613_18610678915052982_7418074617205646379_n.jpg%3Fstp%3Ddst-jpg_e15_p360x360_tt6%26_nc_cat%3D104%26ig_cache_key%3DMzk1NTA5Njk3OTE0Mjk2ODc0Mw%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuNzIwLnNkci52aWRlb19kZWZhdWx0X2NvdmVyX2ZyYW1lLkMzIn0%253D%26_nc_ohc%3DNHGPgOUVgQkQ7kNvwHkAjeX%26_nc_oc%3DAdofrlZhasJYmaznjIpTio2eSDKK64-_iY8X7yD-0lUfhOV1GQa6z3gJtbHdI_spmjk%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-cph2-1.cdninstagram.com%26_nc_gid%3DwDvY8-5Ssvi7pXe4C5qRig%26_nc_ss%3D7a3ba%26oh%3D00_AQErQNR2yogqsr3EnQhKPkaAX2qtDHE6Okej0TtiEPHhZQ%26oe%3D6A7754B0",
        alt: "SPA",
        tag: "THERAPY",
        title: "Facial Care & Elixirs",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-cph2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F749022874_18605022415052982_4860862612873655940_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh2.08_tt6%26_nc_cat%3D109%26ig_cache_key%3DMzk0MjEwMTg4MTM3NDI2MTMzMQ%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTYxNi5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3DuLfhAhPYje4Q7kNvwF-B1Hy%26_nc_oc%3DAdoq5VAShIU7Y5FvjQR2dM00cmH4IZDr8ia_i1Q2D6ShZC3TmpZqlofNJFle14N5CeE%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-cph2-1.cdninstagram.com%26_nc_gid%3DtE8kHioqXgezywhvdBcEWg%26_nc_ss%3D7a3ba%26oh%3D00_AQAutTA7bnwLr06TM8zBqmBmA0ZHIzJrkNP8R2zhB8-LYg%26oe%3D6A601BD6",
        alt: "WWD",
        tag: "KEYNOTE",
        title: "Longevity Summit",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-bru2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F747998303_18473176636107020_3234507729321345349_n.jpg%3Fstp%3Ddst-jpg_e35_tt6%26_nc_cat%3D106%26ig_cache_key%3DMzk0MTMzNzg2NTk1MDYxNTgxOA%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3DOvMP1YaUnhUQ7kNvwGUmGKJ%26_nc_oc%3DAdqvW5BS2Ts7UF0-Nu1sBYlbGbnM9KU8d4BtI7MvZ1cg0L2hOZqm0aQETa1jz6-bWBs%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26se%3D7%26_nc_ht%3Dscontent-bru2-1.cdninstagram.com%26_nc_gid%3DSilVTk0cv68xueXayF9pSw%26_nc_ss%3D7a3ba%26oh%3D00_AQCSfefgEM7Kl1vzwgzh63xQyniX5SMyA2YGMmZ6sxgQ5w%26oe%3D6A5D5C57",
        alt: "Cactus",
        tag: "SONORAN",
        title: "Wild Botanical Reserve",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-arn2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F742241635_18603781249052982_9131515533431880579_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_tt6%26_nc_cat%3D107%26ig_cache_key%3DMzkzOTEyODE1MTUyMTA2Mjc4Mg%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ4NS5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3DXcETU3p-uyIQ7kNvwGYNDnw%26_nc_oc%3DAdrhrcwrxkFD63hjouJlJNgfj-AxIob8AltLKf4VynEtxzFD6KeubN-EJ6R90DlyNrQ%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-arn2-1.cdninstagram.com%26_nc_gid%3DhTejShm9_U-HjrQQq-VO1g%26_nc_ss%3D7a3ba%26oh%3D00_AQCtYM5x26ghgm2m8IFl9O0vNddQ32M6u0OXSX7busnkCA%26oe%3D6A5ADC66",
        alt: "Guide",
        tag: "PRACTICE",
        title: "Mindful Alignment",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-vie1-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F735861014_18603452455052982_404656903556363343_n.jpg%3Fstp%3Ddst-jpg_e15_p360x360_tt6%26_nc_cat%3D103%26ig_cache_key%3DMzkzODMyMDA4MzQyMDAwMTcxNA%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuNzIwLnNkci52aWRlb19kZWZhdWx0X2NvdmVyX2ZyYW1lLkMzIn0%253D%26_nc_ohc%3D_Dp8CPksoWsQ7kNvwFy1rdL%26_nc_oc%3DAdoaA9_bRkCyw7wc8quBq9_RgnrrLp-6H_9CE2ATfvFfB8-DSNDrpHYAOmHjUUq4G3I%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-vie1-1.cdninstagram.com%26_nc_gid%3DnGQPOohyXJfTq5JIQvOtFw%26_nc_ss%3D7a3ba%26oh%3D00_AQAVeRyVrkWY0Hfruc9ej2LDEtpPTjkoVPkCqhsEHM1xvA%26oe%3D6A583322",
        alt: "Healing",
        tag: "SOUND BATH",
        title: "Vibrational Healing",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-bru2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F728778763_18600330613052982_8090064086809120557_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh2.08_tt6%26_nc_cat%3D105%26ig_cache_key%3DMzkzMTA3MjQ3ODY5ODY4NDA0NQ%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjE2MC5zZHIucmVndWxhcl9waG90by5DMiJ9%26_nc_ohc%3DQIrL4Vi5GPgQ7kNvwGwg2_L%26_nc_oc%3DAdocFad86Z_ie4EuYvnSWCe1Oxj1PPgJ4qjJRAUUWZB4Y-ayrp7BzgrCEd1asIQPkVIdkfPRMz8lCGcCp6_bbBhs%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-bru2-1.cdninstagram.com%26_nc_gid%3DyTRGyeeXxpnNTg1E2NLxCw%26_nc_ss%3D7a3ba%26oh%3D00_AQBN1yEbGDXtzpXrskOkbpQmt9kSVatlEZKuxAQAq-B0Fw%26oe%3D6A4AFB53",
        alt: "Supper Series",
        tag: "NUTRITION",
        title: "Soil-to-Table Dinner",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-cph2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F728296831_18597971953052982_7732879556378517896_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh2.08_tt6%26_nc_cat%3D106%26ig_cache_key%3DMzkyNjAyNzEyNjE0MDMxNDY5MA%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTYyMC5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3DcONpFn2u42cQ7kNvwGupLe0%26_nc_oc%3DAdqmxwGw-kvW2M09CrNdNJ9Ub0T0G7sah_jT6F8fDIRAjyClcs1Ue6DIIWb1Tf2i220%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-cph2-1.cdninstagram.com%26_nc_gid%3D-ACAY8zMfhMw3mfvyEy-IQ%26_nc_ss%3D7a3ba%26oh%3D00_Af9ASALw0nOYj3GOYdZv4BFl0mIrDH0WUs3SoHuPLXK3LA%26oe%3D6A4309BB",
        alt: "Garden",
        tag: "FLORA",
        title: "Woodside Forest Atelier",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-cph2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F726774599_18597043345052982_1872694169355542588_n.jpg%3Fstp%3Ddst-jpg_e15_s640x640_tt6%26_nc_cat%3D103%26ig_cache_key%3DMzkyMzk1NTYxNzQ4NTk4ODAyMzE4NTk3MDQzMzQyMDUyOTgy.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjcyMC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9%26_nc_ohc%3DUFgJAfBY4JMQ7kNvwF79Set%26_nc_oc%3DAdrhdfJf_-hAHl3czlkbCChcpniOI_mPhpcsF39I-BFNIZk69TxvOQqcmQHFnviRf9c%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-cph2-1.cdninstagram.com%26_nc_gid%3DoUv3i-rE-RPgI6XOjuP4CQ%26_nc_ss%3D7a3ba%26oh%3D00_Af-EICDFVO13uSb0ATagQ8QPssQWgQwdAqx-8tBR6lsReQ%26oe%3D6A3DA9EE",
        alt: "Yoga",
        tag: "MOVEMENT",
        title: "Kinetic Flow",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-vie1-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F720101150_18593504662052982_8463715327376010194_n.jpg%3Fstp%3Ddst-jpg_e15_s640x640_tt6%26_nc_cat%3D111%26ig_cache_key%3DMzkxNTI3ODQ4NTk4OTczOTk5NjE4NTkzNTA0NjU5MDUyOTgy.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjEwODAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%253D%253D%26_nc_ohc%3Dvwtazi_epNsQ7kNvwFL9m-a%26_nc_oc%3DAdr8fBm2IwuXl6bzW9G01qDCE3Mc_2rKZFaFl3fLAkjOTsKuaSWHywgVs7OovQpXJZI%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-vie1-1.cdninstagram.com%26_nc_gid%3DShiTAWCkC6B6kD564C5V-A%26_nc_ss%3D7a3ba%26oh%3D00_Af_a9Wk-7jARscXa-K_R7TcntQNH3C2AvI2M6JxncNM23g%26oe%3D6A2E052F",
        alt: "Vitality",
        tag: "LONGEVITY",
        title: "Lifelong Vitality",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-bru2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F712266997_18591458218052982_3860367352898495430_n.jpg%3Fstp%3Ddst-jpg_e35_tt6%26_nc_cat%3D103%26ig_cache_key%3DMzkxMDE3NTM5MTY4OTk2NDgxNg%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3D3Nk2g9OoMcAQ7kNvwFmpi8G%26_nc_oc%3DAdqtL_J-5pMasLjii8ml5RsmkOs6moTNOVMNOyDXsIkrx8qNoLpA2SNEFBVc1NKeP90%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26se%3D7%26_nc_ht%3Dscontent-bru2-1.cdninstagram.com%26_nc_gid%3DnYRDsMUe4mrAvUK5hkj5Aw%26_nc_ss%3D7a3ba%26oh%3D00_Af-JxqgjtPccaSgun4JiUpzcxSiQd1cPEBvIWKO2cNnAZA%26oe%3D6A260B39",
        alt: "5 Services",
        tag: "PILLARS",
        title: "Holistic Core",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-cph2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F709447849_18589878097052982_6052259410326807137_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh2.08_tt6%26_nc_cat%3D107%26ig_cache_key%3DMzkwNjU5NjY1Mzg4Nzc0NDM1Nw%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ4NS5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3DFFk93s_39acQ7kNvwErW6Y2%26_nc_oc%3DAdqNRKOegG3uU3qSVu2CUwMSMy2iUwIen0yxucL4iF_EzikrNb_8G7Z25JvITBm6BTE%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-cph2-1.cdninstagram.com%26_nc_gid%3DlYf3YBZRcZYAzoAW7t-UdA%26_nc_ss%3D7a3ba%26oh%3D00_Af4KpEL1J9X-ok7B-prqvzVt4lyUPYzNh5CLjw8SwZcPkQ%26oe%3D6A1E0747",
        alt: "3 days at Canyon Ranch",
        tag: "JOURNEY",
        title: "3 Days in Tucson",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-vie1-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F692642115_18586235512052982_7940306185419610952_n.jpg%3Fstp%3Ddst-jpg_e35_tt6%26_nc_cat%3D108%26ig_cache_key%3DMzg5NzgyNjg2MzQxMTk5MzgxMQ%253D%253D.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9%26_nc_ohc%3DHKWCgeutav4Q7kNvwEZlyO7%26_nc_oc%3DAdr3UL1HH_LYwREOfJYSgqKGRNRg0Y2uIm-5hjokTA1MwYM67rv_ATFTzwNTAHcu7PI%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26se%3D7%26_nc_ht%3Dscontent-vie1-1.cdninstagram.com%26_nc_gid%3DCBMqvbD5niFeHKz1QK3-Nw%26_nc_ss%3D7a3ba%26oh%3D00_Af4g1FIGMSWyJdpa8DWa4ruawyJYW5Ob9RkV5Mz-1V2I5Q%26oe%3D6A0E32BA",
        alt: "Events",
        tag: "GATHERING",
        title: "Symphony at Sunset",
    },
    {
        src: "https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fscontent-bru2-1.cdninstagram.com%2Fv%2Ft51.82787-15%2F682716884_18575030857030038_3896026747767872872_n.jpg%3Fstp%3Ddst-jpg_e15_s640x640_tt6%26_nc_cat%3D104%26ig_cache_key%3DMzg4MzA3MzMzMDkwNzMyNjgwOTE4NTc1MDMwODU0MDMwMDM4.3-ccb7-5%26ccb%3D7-5%26_nc_sid%3D58cdad%26efg%3DeyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjIzMDR4NDA5Ni5zZHIuQzMifQ%253D%253D%26_nc_ohc%3Dt21NwJWuWW0Q7kNvwHW2MW_%26_nc_oc%3DAdqTP_yl3yNtR0Ap6vDG4RH9lfGhlpYPUtLjORnd6SF-QJMAA0NW29sdBcxcy9jOQYc%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_zt%3D23%26_nc_ht%3Dscontent-bru2-1.cdninstagram.com%26_nc_gid%3DN-OEjibdPqa86y3Crbf3Lw%26_nc_ss%3D7a3ba%26oh%3D00_Af1qvEYGwRM1KyWK3P7Zgr5cUalDo6c7inLVdhvQIw62sA%26oe%3D69F3E17B",
        alt: "House",
        tag: "ARCHITECTURE",
        title: "Sanctuary Haven",
    },
];

export default function Wellness() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const duplicatedItems = [...galleryItems, ...galleryItems];

    useGSAP(
        () => {
            const container = containerRef.current;
            const track = trackRef.current;
            if (!container || !track) return;

            if (titleRef.current) {
                const splitTitle = new SplitText(titleRef.current, {
                    type: "words,chars",
                    wordsClass: styles.wordMask,
                    charsClass: styles.charInner,
                });

                gsap.fromTo(
                    splitTitle.chars,
                    { yPercent: 120, opacity: 0, rotateZ: 2 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        rotateZ: 0,
                        duration: 1.0,
                        stagger: 0.015,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 88%",
                        },
                    }
                );
            }

            const loopTween = gsap.to(track, {
                xPercent: -50,
                ease: "none",
                duration: 48,
                repeat: -1,
            });

            tweenRef.current = loopTween;

            ScrollTrigger.create({
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    const velocity = Math.abs(self.getVelocity() / 300);
                    gsap.to(loopTween, {
                        timeScale: 1 + velocity,
                        duration: 0.4,
                        overwrite: "auto",
                        onComplete: () => {
                            gsap.to(loopTween, { timeScale: 1, duration: 1.2 });
                        },
                    });
                },
            });
        },
        { scope: containerRef }
    );

    const handleMouseEnter = () => {
        if (tweenRef.current) {
            gsap.to(tweenRef.current, { timeScale: 0.35, duration: 0.8 });
        }
    };

    const handleMouseLeave = () => {
        if (tweenRef.current) {
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8 });
        }
    };

    return (
        <section className={styles.wellness} ref={containerRef} id="moments">
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.tagRow}>
                            <span className={styles.badgeDot} />
                            <span className={styles.sectionIndex}>[ SECTION 06 / MOMENTS ]</span>
                        </div>
                        <h2 ref={titleRef} className={styles.mainTitle}>
                            #WELLNESSMOMENTS
                        </h2>
                    </div>

                    <div className={styles.headerRight}>
                        <Link
                            href="https://instagram.com/canyonranch"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.handleLink}
                        >
                            <span className={styles.crBadge}>CR</span>
                            <div className={styles.handleText}>
                                <span className={styles.accountName}>Canyon Ranch</span>
                                <span className={styles.verifiedDot}>●</span>
                                <span className={styles.handleTag}>@xyz</span>
                            </div>
                        </Link>
                    </div>
                </header>

                <div
                    className={styles.marqueeViewport}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={styles.track} ref={trackRef}>
                        {duplicatedItems.map((item, idx) => (
                            <article key={idx} className={styles.sliderCard}>
                                <div className={styles.cardInner}>
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 768px) 65vw, 25vw"
                                        unoptimized
                                        className={styles.cardImg}
                                    />
                                    <div className={styles.gradientOverlay} />

                                    <div className={styles.cardHeader}>
                                        <span className={styles.categoryTag}>{item.tag}</span>
                                        <span className={styles.expandIcon}>↗</span>
                                    </div>

                                    <div className={styles.cardFooter}>
                                        <h3 className={styles.itemTitle}>{item.title}</h3>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}