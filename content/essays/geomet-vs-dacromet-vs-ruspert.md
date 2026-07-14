---
title: "Geomet vs Dacromet vs Ruspert: Performance and Fastener Coating Requirements"
date: 2026-07-14
description: "A technical comparison of Geomet, Dacromet, and Ruspert coatings for fasteners, covering corrosion resistance, hydrogen embrittlement, friction control, compliance, and RFQ requirements."
categories: ["Fasteners"]
tags:
  - fasteners
  - coatings
  - corrosion protection
  - Geomet
  - Dacromet
  - Ruspert
summary: "Geomet, Dacromet, and Ruspert are widely used corrosion-protective coatings for fasteners, but they differ significantly in coating structure, environmental compliance, hydrogen embrittlement risk, friction control, and suitable applications."
math: false
draft: false
---

# Geomet vs Dacromet vs Ruspert

Geomet, Dacromet, and Ruspert are widely used corrosion-protective coatings for fasteners, but they differ significantly in coating structure, environmental compliance, hydrogen embrittlement risk, friction control, and suitable applications.

In general:

- **Geomet** is a modern, chromium-free zinc-flake coating system.
- **Dacromet** is a traditional zinc-flake coating system that normally contains hexavalent chromium.
- **Ruspert** is typically a multilayer system consisting of zinc plating, a conversion layer, and a baked ceramic topcoat.

For modern high-strength bolts, controlled tightening, and strict environmental compliance, **Geomet is generally the strongest option**. For construction screws and self-drilling screws, especially where colour and installation abrasion resistance matter, **Ruspert is often attractive**. Traditional **Dacromet is mainly a legacy specification**.

## Overall Comparison

| Property | Geomet | Dacromet | Ruspert |
|---|---|---|---|
| Basic system | Zinc/aluminium flake in inorganic binder | Zinc/aluminium flake in chromium-containing inorganic binder | Zinc plating, conversion layer, and baked ceramic topcoat |
| Application | Non-electrolytic dip-spin, spray, or rack coating | Non-electrolytic dip-spin or spray | Usually electroplating followed by conversion and ceramic coating |
| Typical thickness | Approximately 6–15 μm | Commonly around 6–12 μm | Depends on grade and supplier; generally a thicker multilayer system |
| Typical salt-spray rating | Approximately 720–2,000 hours depending on grade and topcoat | Commonly 500–1,000+ hours depending on system | Common grades include R500, R1000, and R1500 |
| Hexavalent chromium | No | Traditional Dacromet normally contains Cr(VI) | Must be confirmed by supplier; modern systems are commonly offered Cr(VI)-free |
| RoHS/REACH suitability | Generally compliant when using the specified current system | Traditional Dacromet is generally unsuitable for RoHS applications | Product-specific; require a compliance declaration |
| Hydrogen embrittlement risk | Very low when mechanically cleaned and non-electrolytically applied | Very low when mechanically cleaned and non-electrolytically applied | Higher process concern because the zinc base layer is normally electroplated |
| Friction control | Excellent range of engineered topcoats | Available, but older systems are less commonly specified today | Possible, but often less standardised than automotive zinc-flake systems |
| Colour | Mainly silver or grey; black and coloured topcoats are available | Usually silver-grey or black | Wide range, including silver, black, blue, green, and brown |
| Installation damage resistance | Good, but performance depends on the topcoat | Good cathodic protection; basecoat may dust or abrade without a topcoat | Ceramic topcoat often provides good resistance during screw installation |
| Typical uses | Automotive fasteners, structural bolts, high-strength fasteners, defence, and industrial parts | Legacy automotive and industrial fasteners | Roofing, decking, concrete, timber, and self-drilling screws |

## 1. Corrosion Performance

### Geomet

Geomet normally gives the most predictable high-performance result when the coating grade, coating mass, topcoat, and application process are properly specified.

Typical systems include:

- **720 hours** neutral salt spray for standard systems
- **1,000 hours** for more demanding systems
- **1,500–2,000 hours** with higher-performance basecoats and compatible topcoats

It provides both:

- **Barrier protection** from overlapping zinc and aluminium flakes
- **Sacrificial cathodic protection** from zinc

Its corrosion protection can remain effective after minor scratches because nearby zinc can provide sacrificial protection to the exposed steel.

### Dacromet

Dacromet can also provide excellent corrosion resistance with a thin coating. Historically, the chromium chemistry provided strong passivation and self-healing behaviour.

Typical commercial requirements were often:

- 500 hours without red rust
- 1,000 hours for enhanced systems
- Higher results with additional topcoats

However, performance depends heavily on the exact Dacromet grade, coating weight, and number of coats. **"Dacromet" alone is not a complete technical specification.**

### Ruspert

Ruspert generally provides very good corrosion resistance, particularly for construction screws.

Common commercial classifications are:

- **R500:** 500 hours to red rust
- **R1000:** 1,000 hours to red rust
- **R1500:** 1,500 hours to red rust

The ceramic top layer protects the zinc beneath it from moisture, chemicals, and mechanical damage. This can be particularly useful for screws driven into timber, sheet metal, or concrete.

### Important Limitation of Salt-Spray Results

A statement such as "1,000-hour coating" does **not automatically mean equal real-world performance** between the three systems.

The specification should confirm:

- Test method, such as ISO 9227, ASTM B117, or JIS Z 2371
- Whether the requirement is for **no red rust** or **no white corrosion**
- Whether testing is performed on an untouched panel or an actual threaded fastener
- Whether parts are scratched, driven, or assembled before testing
- Whether the result applies to the basecoat alone or to the basecoat plus topcoat

## 2. Environmental and Regulatory Requirements

### Geomet

Modern Geomet is generally the safest choice where the customer requires:

- RoHS compliance
- REACH compliance
- Hexavalent-chromium-free coating
- Automotive or defence environmental declarations

Current Geomet systems are generally water-based and chromium-free.

### Dacromet

Traditional Dacromet normally contains **hexavalent chromium, Cr(VI)**.

As a result:

- It is generally unsuitable where RoHS compliance is mandatory
- It may conflict with customer restricted-substance lists
- Processing and waste-disposal requirements are more demanding
- Its use should not be accepted merely because the supplier describes it as a zinc-flake coating

ISO 10683 covers zinc-flake systems both with and without hexavalent chromium. Therefore, compliance with ISO 10683 alone does not prove that the coating is Cr(VI)-free.

For an RFQ, specify:

> Hexavalent-chromium-free zinc-flake coating required.

Do not rely solely upon:

> Zinc-flake coating to ISO 10683.

### Ruspert

Ruspert compliance is more product- and applicator-specific.

Request:

- RoHS declaration
- REACH or SVHC declaration
- Cr(VI) test result or declaration
- Safety Data Sheet or coating technical data sheet

Do not assume every product sold as Ruspert uses identical chemistry.

## 3. Hydrogen Embrittlement

Hydrogen embrittlement is one of the most important differences between these coating systems.

### Geomet and Dacromet

Geomet and Dacromet are **non-electrolytically applied** zinc-flake systems.

When pretreatment uses alkaline cleaning and mechanical blasting rather than acid pickling, hydrogen is not intentionally introduced during coating.

They are therefore well suited to:

- Property class 10.9 and 12.9 bolts
- High-hardness tapping screws
- Springs and clips
- Parts above approximately 1,000 MPa tensile strength
- Parts above approximately 320 HV hardness

### Ruspert

The conventional Ruspert system begins with a **metallic zinc electroplated layer**.

Electroplating and acid cleaning may introduce hydrogen.

For high-strength carbon-steel components, the supplier should confirm:

- Whether acid pickling is used
- Whether post-plating hydrogen-relief baking is performed
- Baking temperature and time
- Maximum substrate hardness or tensile strength permitted
- Compliance with the relevant hydrogen-embrittlement requirement

Ruspert may still be suitable for hardened screws, but it should not automatically be treated as equivalent to a non-electrolytic zinc-flake coating for hydrogen-embrittlement-sensitive parts.

## 4. Friction and Tightening Performance

For structural, automotive, and engineered bolted joints, corrosion resistance alone is insufficient. The coating must also provide controlled friction.

### Geomet

Geomet has a broad range of engineered lubricated topcoats.

Depending on the system, the supplier can control:

- Coefficient of friction
- Torque–tension relationship
- Repeat tightening behaviour
- Resistance to stick-slip
- Compatibility with prevailing-torque nuts
- Resistance to automotive fluids and chemicals

This makes Geomet particularly suitable for torque-critical fasteners.

### Dacromet

Dacromet basecoat alone does not necessarily provide the required tightening characteristics.

A lubricated topcoat may be required.

The specification should identify:

- Basecoat grade
- Topcoat grade
- Required coefficient of friction
- Test method, normally ISO 16047
- Torque–tension acceptance criteria

### Ruspert

Ruspert can provide good installation behaviour, particularly for drilling and tapping screws.

However, generic Ruspert specifications often focus on salt-spray hours rather than coefficient of friction.

For preloaded bolts or torque-critical assemblies, do not accept "Ruspert 1,000 hours" as a complete specification. Require actual torque–tension or friction data.

## 5. Temperature Considerations

### During Coating

Typical curing conditions vary by coating system:

- **Geomet and Dacromet:** often require curing at approximately 200–320°C, depending on the product
- **Ruspert:** commonly uses a lower-temperature process, often below approximately 200°C

This matters for:

- Through-hardened screws
- Case-hardened drilling screws
- Components whose hardness or microstructure could be affected by curing
- Parts already fitted with adhesives, nylon, or elastomeric components

### In Service

Operating-temperature resistance depends on the complete system, particularly the topcoat.

High temperatures can affect:

- Lubricant
- Colour
- Organic topcoat
- Coefficient of friction
- Corrosion performance

A salt-spray rating does not establish a coating's allowable service temperature.

## 6. Dimensional and Thread Requirements

All three coatings can affect thread fit, drive recesses, and small clearances.

For threaded fasteners, specify:

- Thread tolerance before coating
- Required acceptance after coating
- GO/NO-GO gauge requirement
- Maximum local coating buildup
- No blocked recesses, threads, or drive features
- No excessive coating accumulation in blind holes or under heads

Geomet and Dacromet are thin coatings, but dip-spin processing can cause buildup:

- Under bolt heads
- Inside recesses
- At thread roots
- Inside small nuts
- At the ends of long parts

Ruspert may have greater total coating buildup because it uses multiple layers, although the actual thickness must be confirmed by the applicator.

## 7. Applicable Specifications

### Geomet and Dacromet

Common standards include:

- **ISO 10683:2018** — non-electrolytically applied zinc-flake coating systems for fasteners
- **ASTM F1136/F1136M** — zinc/aluminium corrosion-protective coatings for fasteners
- **ISO 9227** or **ASTM B117** — neutral salt-spray testing
- **ISO 16047** — torque/clamp-force and friction testing
- Customer or OEM specifications

ISO 10683 covers systems with or without Cr(VI), and may include topcoat and lubricant requirements.

### Ruspert

Ruspert is a proprietary coating designation rather than a single generic ISO fastener coating class.

Requirements are usually controlled through:

- Supplier or licence-holder specification
- R500, R1000, or R1500 performance grade
- ISO 9227 or ASTM B117 testing
- Construction screw standard
- Customer-specific specification

A quotation should not merely state "Ruspert." It should specify the required performance and compliance documents.

## Practical Selection Guide

### Select Geomet When

- The fastener is class 10.9, 12.9, or otherwise hydrogen-sensitive
- RoHS and Cr(VI)-free compliance are mandatory
- Tightening friction must be controlled
- The application is automotive, structural, rail, defence, or engineered industrial equipment
- The drawing calls for ISO 10683 or ASTM F1136
- Thin coating and close dimensional control are important

### Select Dacromet When

- The customer drawing specifically requires an existing Dacromet grade
- A legacy part must remain identical to an approved historical system
- Cr(VI) is explicitly permitted
- The applicator can provide the exact licensed basecoat, topcoat, and certification

For a new design, a Cr(VI)-free Geomet equivalent would normally be preferable to traditional Dacromet.

### Select Ruspert When

- The product is a self-drilling, roofing, decking, timber, or concrete screw
- Good installation-abrasion resistance is needed
- A coloured finish is required
- R500, R1000, or R1500 is recognised by the customer
- Torque control is less critical than installation durability and atmospheric corrosion resistance

## Recommended RFQ Wording

### High-Strength Engineered Fastener

> Non-electrolytically applied, hexavalent-chromium-free zinc-flake coating to ISO 10683:2018, minimum 1,000 hours neutral salt spray to ISO 9227 without red rust. Coating system to include a lubricated topcoat providing a coefficient of friction of 0.12–0.18 when tested in accordance with ISO 16047. Threads shall pass the specified GO gauge after coating. No acid pickling permitted.

### Construction Screw

> Ruspert R1000 or approved equivalent multilayer corrosion-protective coating, minimum 1,000 hours neutral salt spray to ISO 9227 without red rust. Coating shall be RoHS compliant and free from hexavalent chromium. Supplier to provide coating technical data, compliance declaration, and salt-spray report.

## Bottom-Line Assessment

1. **Best overall engineered coating:** Geomet
2. **Best for high-strength fasteners:** Geomet, because it is non-electrolytic and offers controlled friction systems
3. **Best for self-drilling and construction screws:** Often Ruspert
4. **Least suitable for a new environmentally compliant specification:** Traditional Dacromet
5. **Do not compare coatings only by salt-spray hours:** Chemistry, pretreatment, hydrogen embrittlement, friction, coating thickness, and test acceptance criteria are equally important

## Reference Links

- Geomet product information: https://www.nofmetalcoatings.com/
- ISO 10683 standard overview: https://www.iso.org/standard/70609.html
- Ruspert technical information: https://content.hobson.com.au/documents/article-ruspert-coating-2008071.pdf
