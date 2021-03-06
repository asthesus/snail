// [1,2,3]
// [4,5,6]
// [7,8,9]

// [ 1, 2, 3, 4]
// [ 5, 6, 7, 8]
// [ 9,10,11,12]
// [13,14,15,16]

// [ 1, 2, 3, 4, 5, 6, 7]
// [ 8, 9,10,11,12,13,14]
// [15,16,17,18,19,20,21]
// [22,23,24,25,26,27,28]
// [29,30,31,32,33,34,35]
// [36,37,38,39,40,41,42]
// [43,44,45,46,47,48,49]

const threematrix = [[1,2,3],
                     [4,5,6],
                     [7,8,9]];

const three = [1,2,3,4,5,6,7,8,9];
const four = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const seven = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];

snail = (matrix) => {
    const output = {},
    array = [];
    matrix.forEach(subarray => {subarray.forEach(element => array.push(element))}); // convert matrix to array
    const if_a_greater_than_b_return_one_else_zero = (a, b) => (1 + (Math.abs(a - (b + 1/2)) / (a - (b + 1/2)))) / 2,
    //────────────────────────────────────────────────────────┐
    //   · · · · · · S                                        │
    //   · · · · · · S                                        │
    //   · · · · · · S     S represents sidelength (1-based)  │
    //   · · · C · · S                                        │
    //   · · · · · · S     C represents center (0-based)      │
    //   · · · · · · S                                        │
    //   · · · · · · S                                        │
    //                                                        │
    sidelength = Math.sqrt(array.length),                  // │
    center = (sidelength - 1) / 2;                         // │
    //────────────────────────────────────────────────────────┘
    while(Object.values(output).length < array.length) {
        const position = Object.values(output).length,
        x = position % sidelength,                      // coordinates 0-based
        y = Math.floor(position / sidelength),          // coordinates 0-based
        //──────────────────────────────────────────────────────────────────────────────────────────┐
        //   distance (d)       distance * 2       distance * 4              distance * 6           │
        //   3 3 3 3 3 3 3      6 6 6 6 6 6 6      12 12 12 12 12 12 12      18 18 18 18 18 18 18   │
        //   3 2 2 2 2 2 3      6 4 4 4 4 4 6      12  8  8  8  8  8 12      18 12 12 12 12 12 18   │
        //   3 2 1 1 1 2 3      6 4 2 2 2 4 6      12  8  4  4  4  8 12      18 12  6  6  6 12 18   │
        //   3 2 1 · 1 2 3      6 4 2 · 2 4 6      12  8  4  ·  4  8 12      18 12  6  ·  6 12 18   │
        //   3 2 1 1 1 2 3      6 4 2 2 2 4 6      12  8  4  4  4  8 12      18 12  6  6  6 12 18   │
        //   3 2 2 2 2 2 3      6 4 4 4 4 4 6      12  8  8  8  8  8 12      18 12 12 12 12 12 18   │
        //   3 3 3 3 3 3 3      6 6 6 6 6 6 6      12 12 12 12 12 12 12      18 18 18 18 18 18 18   │
        //                                                                                          │
        distance = Math.max(Math.abs(center - x), Math.abs(center - y)),                         // │
        //──────────────────────────────────────────────────────────────────────────────────────────┘
        //────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   north              east               south              west                                                    │
        //  (y - 1 < c - d)    (x + 1 > c + d)    (y + 1 > c + d)    (x - 1 < c - d)                                          │
        //   1 1 1 1 1 1 1      · · · · · · 1      · · · · · · ·      1 · · · · · ·                                           │
        //   · 1 1 1 1 1 ·      · · · · · 1 1      · · · · · · ·      1 1 · · · · ·                                           │
        //   · · 1 1 1 · ·      · · · · 1 1 1      · · · · · · ·      1 1 1 · · · ·                                           │
        //   · · · 1 · · ·      · · · 1 1 1 1      · · · 1 · · ·      1 1 1 1 · · ·                                           │
        //   · · · · · · ·      · · · · 1 1 1      · · 1 1 1 · ·      1 1 1 · · · ·                                           │
        //   · · · · · · ·      · · · · · 1 1      · 1 1 1 1 1 ·      1 1 · · · · ·                                           │
        //   · · · · · · ·      · · · · · · 1      1 1 1 1 1 1 1      1 · · · · · ·                                           │
        //                                                                                                                    │
        north          = if_a_greater_than_b_return_one_else_zero(center - distance,    y - 1            ),                // │
        east           = if_a_greater_than_b_return_one_else_zero(x + 1,                center + distance),                // │
        south          = if_a_greater_than_b_return_one_else_zero(y + 1,                center + distance),                // │
        west           = if_a_greater_than_b_return_one_else_zero(center - distance,    x - 1            ),                // │
        //                                                                                                                    │
        //   negative east      negative south     negative west      negative north                                          │
        //   (x < c + d)        (y < c + d)        (x > c - d)        (y > c - d)                                             │
        //   1 1 1 1 1 1 ·      1 1 1 1 1 1 1      · 1 1 1 1 1 1      · · · · · · ·                                           │
        //   1 1 1 1 1 · ·      1 1 1 1 1 1 1      · · 1 1 1 1 1      1 · · · · · 1                                           │
        //   1 1 1 1 · · ·      1 1 1 1 1 1 1      · · · 1 1 1 1      1 1 · · · 1 1    each of these graphs is the inversion  │
        //   1 1 1 · · · ·      1 1 1 · 1 1 1      · · · · 1 1 1      1 1 1 · 1 1 1                                           │
        //   1 1 1 1 · · ·      1 1 · · · 1 1      · · · 1 1 1 1      1 1 1 1 1 1 1    of the graph above and to the right    │
        //   1 1 1 1 1 · ·      1 · · · · · 1      · · 1 1 1 1 1      1 1 1 1 1 1 1                                           │
        //   1 1 1 1 1 1 ·      · · · · · · ·      · 1 1 1 1 1 1      1 1 1 1 1 1 1                                           │
        //                                                                                                                    │
        negative_north = if_a_greater_than_b_return_one_else_zero(y,                    center - distance),                // │
        negative_east  = if_a_greater_than_b_return_one_else_zero(center + distance,    x                ),                // │
        negative_south = if_a_greater_than_b_return_one_else_zero(center + distance,    y                ),                // │
        negative_west  = if_a_greater_than_b_return_one_else_zero(x,                    center - distance),                // │
        //                                                                                                                    │
        //   north filter       east filter        south filter       west filter                                             │
        //   1 1 1 1 1 1 ·      · · · · · · 1      · · · · · · ·      · · · · · · ·                                           │
        //   · 1 1 1 1 · ·      · · · · · 1 1      · · · · · · ·      1 · · · · · ·                                           │
        //   · · 1 1 · · ·      · · · · 1 1 1      · · · · · · ·      1 1 · · · · ·    each of these graphs is                │
        //   · · · · · · ·      · · · · 1 1 1      · · · · · · ·      1 1 1 · · · ·                                           │
        //   · · · · · · ·      · · · · · 1 1      · · · 1 1 · ·      1 1 1 · · · ·    the above two graphs multiplied        │
        //   · · · · · · ·      · · · · · · 1      · · 1 1 1 1 ·      1 1 · · · · ·                                           │
        //   · · · · · · ·      · · · · · · ·      · 1 1 1 1 1 1      1 · · · · · ·                                           │
        //                                                                                                                    │
        north_filter = north * negative_east ,                                                                             // │
        east_filter  = east  * negative_south,                                                                             // │
        south_filter = south * negative_west ,                                                                             // │
        west_filter  = west  * negative_north,                                                                             // │
        //────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   northeast slope         southeast slope         southwest slope         northwest slope       │
        //   (c - y) - (c - x)       (x - c) + (y - c)       (c - x) - (c - y)       (c - x) - (y - c)     │
        //   ·  1  2  3  4  5  6    -6 -5 -4 -3 -2 -1  ·     · -1 -2 -3 -4 -5 -6     6  5  4  3  2  1  ·   │
        //  -1  ·  1  2  3  4  5    -5 -4 -3 -2 -1  ·  1     1  · -1 -2 -3 -4 -5     5  4  3  2  1  · -1   │
        //  -2 -1  ·  1  2  3  4    -4 -3 -2 -1  ·  1  2     2  1  · -1 -2 -3 -4     4  3  2  1  · -1 -2   │
        //  -3 -2 -1  ·  1  2  3    -3 -2 -1  ·  1  2  3     3  2  1  · -1 -2 -3     3  2  1  · -1 -2 -3   │
        //  -4 -3 -2 -1  ·  1  2    -2 -1  ·  1  2  3  4     4  3  2  1  · -1 -2     2  1  · -1 -2 -3 -4   │
        //  -5 -4 -3 -2 -1  ·  1    -1  ·  1  2  3  4  5     5  4  3  2  1  · -1     1  · -1 -2 -3 -4 -5   │
        //  -6 -5 -4 -3 -2 -1  ·     ·  1  2  3  4  5  6     6  5  4  3  2  1  ·     · -1 -2 -3 -4 -5 -6   │
        //                                                                                                 │
        northeast_slope = (center - y) - (center - x),                                                  // │
        southeast_slope = (x - center) + (y - center),                                                  // │
        southwest_slope = (center - x) - (center - y),                                                  // │
        northwest_slope = (center - x) - (y - center),                                                  // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   northeast slope     southeast slope     southwest slope     northwest slope                   │
        //   * north filter      * east filter       * south filter      * west filter       propeller     │
        //   · 1 2 3 4 5 ·       · · · · · · ·       · · · · · · ·       · · · · · · ·       · 1 2 3 4 5 · │
        //   · · 1 2 3 · ·       · · · · · · 1       · · · · · · ·       5 · · · · · ·       5 · 1 2 3 · 1 │
        //   · · · 1 · · ·       · · · · · 1 2       · · · · · · ·       4 3 · · · · ·       4 3 · 1 · 1 2 │
        //   · · · · · · ·   +   · · · · 1 2 3   +   · · · · · · ·   +   3 2 1 · · · ·   =   3 2 1 · 1 2 3 │
        //   · · · · · · ·       · · · · · 3 4       · · · 1 · · ·       2 1 · · · · ·       2 1 · 1 · 3 4 │
        //   · · · · · · ·       · · · · · · 5       · · 3 2 1 · ·       1 · · · · · ·       1 · 3 2 1 · 5 │
        //   · · · · · · ·       · · · · · · ·       · 5 4 3 2 1 ·       · · · · · · ·       · 5 4 3 2 1 · │
        //                                                                                                 │
        propeller = (northeast_slope * north_filter) +                                                  // │
                    (southeast_slope * east_filter ) +                                                  // │
                    (southwest_slope * south_filter) +                                                  // │
                    (northwest_slope * west_filter ) ,                                                  // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   distance * 2        distance * 4              distance * 6                                    │
        //   * east filter       * south filter            * west filter              wave                 │
        //   · · · · · · 6       ·  ·  ·  ·  ·  ·  ·        ·  ·  ·  ·  ·  ·  ·        ·  ·  ·  ·  ·  ·  6 │
        //   · · · · · 4 6       ·  ·  ·  ·  ·  ·  ·       18  ·  ·  ·  ·  ·  ·       18  ·  ·  ·  ·  4  6 │
        //   · · · · 2 4 6       ·  ·  ·  ·  ·  ·  ·       18 12  ·  ·  ·  ·  ·       18 12  ·  ·  2  4  6 │
        //   · · · · 2 4 6   +   ·  ·  ·  ·  ·  ·  ·   +   18 12  6  ·  ·  ·  ·   =   18 12  6  ·  2  4  6 │
        //   · · · · · 4 6       ·  ·  ·  4  4  ·  ·       18 12  6  ·  ·  ·  ·       18 12  6  4  4  4  6 │
        //   · · · · · · 6       ·  ·  8  8  8  8  ·       18 12  ·  ·  ·  ·  ·       18 12  8  8  8  8  6 │
        //   · · · · · · ·       · 12 12 12 12 12 12       18  ·  ·  ·  ·  ·  ·       18 12 12 12 12 12 12 │
        //                                                                                                 │
        wave = (distance * 2 * east_filter ) +                                                          // │
               (distance * 4 * south_filter) +                                                          // │
               (distance * 6 * west_filter ) ,                                                          // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   pyramid                                                                                       │
        //   ·  ·  ·  ·  ·  · ·     ┌─────────────24┐     the value at a point X in the "pyramid"          │
        //   · 24 24 24 24 24 ·     │ ┌─────────16┐ │                                                      │
        //   · 24 40 40 40 24 ·     │ │ ┌──────8┐ │ │     is equal to the number of points                 │
        //   · 24 40 48 40 24 ·     │ │ │   •   │ │ │                                                      │
        //   · 24 40 40 40 24 ·     │ │ └───────┘ │ │     which have higher distance from center than X    │
        //   · 24 24 24 24 24 ·     │ └───────────┘ │                                                      │
        //   ·  ·  ·  ·  ·  · ·     └───────────────┘     ( 24,      24 + 16,       24 + 16 + 8 )          │
        //                                                                                                 │
        pyramid = (center * (center + 1) * 4) - (distance * (distance + 1) * 4),                        // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        // pyramid                  wave                       propeller           snail                   │
        // ·  ·  ·  ·  ·  · ·        ·  ·  ·  ·  ·  ·  6       · 1 2 3 4 5 ·        ·  1  2  3  4  5  6    │
        // · 24 24 24 24 24 ·       18  ·  ·  ·  ·  4  6       5 · 1 2 3 · 1       23 24 25 26 27 28  7    │
        // · 24 40 40 40 24 ·       18 12  ·  ·  2  4  6       4 3 · 1 · 1 2       22 39 40 41 42 29  8    │
        // · 24 40 48 40 24 ·   +   18 12  6  ·  2  4  6   +   3 2 1 · 1 2 3   =   21 38 47 48 43 30  9    │
        // · 24 40 40 40 24 ·       18 12  6  4  4  4  6       2 1 · 1 · 3 4       20 37 46 45 44 31 10    │
        // · 24 24 24 24 24 ·       18 12  8  8  8  8  6       1 · 3 2 1 · 5       19 36 35 34 33 32 11    │
        // ·  ·  ·  ·  ·  · ·       18 12 12 12 12 12 12       · 5 4 3 2 1 ·       18 17 16 15 14 13 12    │
        snail = propeller + wave + pyramid;                                                             // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        output[snail] = array[position];
    }
    return Object.values(output);
}

wyvern = (m) => {
    const a = [];
    m.forEach(r => {r.forEach(t => a.push(t))});
    const o = {},
    q = Math.sqrt(a.length),
    c = (q - 1) / 2,
    g = (a, b) => (1 + (Math.abs(a - (b + 1/2)) / (a - (b + 1/2)))) / 2;
    while(Object.values(o).length < a.length) {
        const p = Object.values(o).length,
        x = p % q,
        y = Math.floor(p / q),
        d = Math.max(Math.abs(c - x), Math.abs(c - y)),
        N = g(c - d, y - 1),
        E = g(x + 1, c + d),
        S = g(y + 1, c + d),
        W = g(c - d, x - 1),
        n = g(y, c - d),
        e = g(c + d, x),
        s = g(c + d, y),
        w = g(x, c - d),
        P = (c * (c + 1) * 4) - (d * (d + 1) * 4) +
            (N * e * ((c - y) - (c - x))) +
            (E * s * (((x - c) + (y - c)) + (d * 2))) +
            (S * w * (((c - x) - (c - y)) + (d * 4))) +
            (W * n * (((c - x) - (y - c)) + (d * 6)));
        o[P] = a[p];
    }
    return Object.values(o);
}
