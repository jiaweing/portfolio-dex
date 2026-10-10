---
title: "You can’t slice a pizza into 7"
date: "2026-04-20T21:24:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: ["Philosophy","Learning"]
---

Next time you order a pizza for seven people, try cutting it into perfectly equal slices. You'll quickly find out it's harder than it sounds. Not "tricky" hard, but mathematically, provably hard. The kind of hard that stumped geometers for centuries and connects your Friday night dinner to one of the deepest results in abstract algebra.
The reason you can't do it has nothing to do with your knife skills. It has everything to do with the number 7 itself.
## The geometry of pizza slicing
When we cut a pizza the traditional way, we make straight cuts through the center. Each cut creates two radial lines, dividing the circle into equal sectors. If you want 8 slices, you make 4 cuts at 45-degree intervals. Easy. For 6 slices, 3 cuts at 60 degrees. Also easy.
But what about 7? You'd need to place 7 radial lines at exactly 360/7 degrees apart, which comes out to roughly 51.4286 degrees. That's an angle you can't construct exactly with a compass and straightedge, which are the classical tools of Euclidean geometry.
This isn't just a practical limitation. It's a mathematical impossibility.
## Why 7 is special (and not in a good way)
The question of which regular polygons can be constructed with compass and straightedge is ancient. The Greeks could construct equilateral triangles (3 sides), squares (4), pentagons (5), and hexagons (6). But the heptagon, the regular 7-sided polygon, eluded them.
For over two thousand years, nobody could figure out whether this was a gap in technique or a fundamental barrier. Then, in the late 18th and early 19th centuries, two mathematicians settled the question definitively.
In 1796, a 19-year-old Carl Friedrich Gauss proved that a regular 17-sided polygon (the heptadecagon) could be constructed with compass and straightedge. This was a stunning result, and Gauss was so proud of it that he reportedly asked for a 17-gon to be inscribed on his tombstone. More importantly, Gauss established the conditions under which any regular polygon is constructible.
In 1837, Pierre Wantzel completed the proof by showing the conditions Gauss identified were not just sufficient but necessary. Together, their work gives us the Gauss-Wantzel theorem.
## The Gauss-Wantzel theorem
The theorem states that a regular polygon with *n* sides can be constructed using only a compass and straightedge if and only if *n* is of the form:
*n* = 2\^k × p₁ × p₂ × ... × pₜ
where *k* is a non-negative integer and each *p* is a distinct **Fermat prime**.
A Fermat prime is a prime number of the form 2\^(2\^m) + 1. Only five Fermat primes are known to exist:
- F₀ = 3
- F₁ = 5
- F₂ = 17
- F₃ = 257
- F₄ = 65,537
That's it. Despite centuries of searching, no one has found a sixth Fermat prime, and many mathematicians suspect there isn't one.
So which polygons are constructible? Triangles (3), squares (4 = 2²), pentagons (5), hexagons (6 = 2 × 3), octagons (8 = 2³), and so on. You can construct a regular 17-gon, a 257-gon, even a 65,537-gon. But you cannot construct a regular heptagon.
The number 7 is prime, but it's not a Fermat prime. It can't be written as 2\^(2\^m) + 1 for any integer *m*. And that single fact is what makes 7 the smallest number of sides for which a regular polygon is impossible to construct with classical tools.
## What this means for your pizza
Back to the pizza. When you make straight cuts through the center to create equal slices, you're essentially constructing a regular polygon. The vertices of your slice boundaries, where they hit the crust, form the corners of that polygon.
For 7 equal slices, you'd need to construct a regular heptagon. And the Gauss-Wantzel theorem says you can't do that with straight lines from a center point. Not approximately. Not with enough patience. The exact angle of 360/7 degrees is not constructible.
This is why pizza places don't offer 7-slice options. It's not a convention, it's geometry protecting us from an impossible task.
## The deeper connection
What makes this result so striking is the bridge it builds between geometry and algebra. The proof that the heptagon is unconstructible doesn't come from drawing circles and lines. It comes from showing that cos(2π/7) is a root of an irreducible cubic polynomial over the rationals.
Compass and straightedge constructions can only produce lengths that are solutions to sequences of quadratic equations (you can add, subtract, multiply, divide, and take square roots). But the minimal polynomial for cos(2π/7) is:
8x³ + 4x² − 4x − 1 = 0
This is degree 3, not a power of 2. No amount of square root operations can solve it. The algebra literally forbids the geometry.
This insight, that algebraic properties of numbers determine what's geometrically possible, was revolutionary. It transformed geometry from a discipline of ruler and compass into one deeply intertwined with field theory and abstract algebra.
## Cheating (with better tools)
Of course, mathematicians love a good workaround.
If you allow a **neusis construction**, where you can slide a marked ruler to fit between two curves, then the heptagon becomes constructible. Archimedes used neusis to trisect arbitrary angles, and François Viète gave the first neusis construction of a regular heptagon in 1593. The constraint isn't about the shape being impossible in some absolute sense. It's about the specific toolkit you're allowed to use.
There are also practical tricks. You can fold a strip of paper into a knot that approximates a regular heptagon remarkably well. Or you could use a protractor, which is essentially cheating in the eyes of classical geometry but works perfectly fine for pizza.
More recently, mathematicians Joel Haddley and Stephen Worsley at the University of Liverpool showed that by using curved cuts instead of straight lines, you can divide a pizza into any number of equal pieces. Their method produces exotic, shield-shaped slices that all have identical area. It's mathematically elegant, if impractical for actual eating.
## Why it matters beyond pizza
The unconstructibility of the heptagon is a small example of a much larger pattern. Many problems that seem like they should have solutions turn out to be provably impossible within a given framework. You can't trisect an arbitrary angle with compass and straightedge. You can't square the circle. You can't double the cube.
These impossibility results aren't failures. They're some of the most powerful theorems in mathematics. They tell us something deep about the structure of the tools we use and the numbers we work with. They reveal that mathematical systems have inherent boundaries, and understanding those boundaries is just as important as working within them.
The number 7 sits right at the edge of that boundary. It's the smallest crack in the armor of Euclidean construction, the first number where our oldest and most intuitive geometric tools simply aren't enough.
So the next time someone asks you to split a pizza seven ways, you have two options: reach for a protractor, or just order two pizzas.
## References
1. Gauss-Wantzel theorem and constructible polygons, [Wikipedia: Constructible polygon](https://en.wikipedia.org/wiki/Constructible_polygon)
2. The regular heptagon as the smallest non-constructible polygon, [ProofWiki: Regular Heptagon is Smallest with no Compass and Straightedge Construction](https://proofwiki.org/wiki/Regular_Heptagon_is_Smallest_with_no_Compass_and_Straightedge_Construction)
3. Proof that constructing a heptagon is impossible, [mathschallenge.net](http://mathschallenge.net)
4. Neusis construction and the heptagon, [Wolfram MathWorld: Neusis Construction](https://mathworld.wolfram.com/NeusisConstruction.html)
5. Viète's neusis construction of the regular heptagon (1593), [UC Berkeley: Viete's construction](https://math.berkeley.edu/~robin/Viete/construction.html)
6. Haddley and Worsley, "Infinite families of monohedral disk tilings" (2015), [arXiv:1512.03794](http://arxiv.org/abs/1512.03794)
7. The pizza theorem, [Wikipedia: Pizza theorem](https://en.wikipedia.org/wiki/Pizza_theorem)
8. Gauss's proof of the constructibility of the heptadecagon, [Eric Keilty](https://erickeilty.com/blog/guass-proof-of-the-constructibilty-of-the-heptadecagon/)
