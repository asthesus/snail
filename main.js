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

const three = [1,2,3,4,5,6,7,8,9];
const four = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const seven = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];
// const seven = [];
// seven.length = 49;

integer_greater_than_integer=(x, y)=>{
    // 1 if true, 0 if false
    return (1 + (Math.abs(x-(y + 1/2)) / (x-(y + 1/2)))) / 2;
}

integer_equal_to_integer=(x, y)=>{
    // 1 if true, 0 if false
    return 0 ** (x - y) ** 2;
}

integer_equal_to_zero=(x)=>{
    // 1 if true, 0 if false
    return 0 ** x ** 2;
}

test_component_pyramid=(a)=>{
    let o = [];
    let q = Math.sqrt(a.length); // sidelength
    let c = (q - 1) / 2; // center index
    while(o.length < a.length) {
        let p = o.length; // scanning position
        let x = p % q; // coordinates
        let y = Math.floor(p / q); // coordinates
        let d = Math.max(Math.abs(c - x), Math.abs(c - y)); // index absolute distance from center index
        o.push((c * (c + 1) * 4) - (d * (d + 1) * 4));
    }
    return o;
}

test_component_chunks=(a)=>{
    let o = [];
    let q = Math.sqrt(a.length); // sidelength
    let c = (q - 1) / 2; // center index
    while(o.length < a.length) {
        let p = o.length; // scanning position
        let x = p % q; // coordinates
        let y = Math.floor(p / q); // coordinates
        let d = Math.max(Math.abs(c - x), Math.abs(c - y)); // index absolute distance from center index
        o.push(
            ((x >= c + d) * (y < c + d) * d * 2) +
            ((y >= c + d) * (x > c - d) * d * 4) +
            ((x <= c - d) * (y > c - d) * d * 6)
        );
    }
    return o;
}

test_component_slopes=(a)=>{
    let o = [];
    let q = Math.sqrt(a.length); // sidelength
    let c = (q - 1) / 2; // center index
    while(o.length < a.length) {
        let p = o.length; // scanning position
        let x = p % q; // coordinates
        let y = Math.floor(p / q); // coordinates
        let d = Math.max(Math.abs(c - x), Math.abs(c - y)); // index absolute distance from center index
        let northeast = (c - y) - (c - x);
        let southeast = (x - c) + (y - c);
        let southwest = (c - x) - (c - y);
        let northwest = (c - x) - (y - c);
        o.push(
            northeast + southeast + southwest + northwest
            // (c - y) - (c - x)
            // [ 0, 1, 2, 3, 4, 5, 6
            //  -1, 0, 1, 2, 3, 4, 5
            //  -2,-1, 0, 1, 2, 3, 4
            //  -3,-2,-1, 0, 1, 2, 3
            //  -4,-3,-2,-1, 0, 1, 2
            //  -5,-4,-3,-2,-1, 0, 1
            //  -6,-5,-4,-3,-2,-1, 0]
            // (x - c) + (y - c)
            // [-6,-5,-4,-3,-2,-1, 0
            //  -5,-4,-3,-2,-1, 0, 1
            //  -4,-3,-2,-1, 0, 1, 2
            //  -3,-2,-1, 0, 1, 2, 3
            //  -2,-1, 0, 1, 2, 3, 4
            //  -1, 0, 1, 2, 3, 4, 5
            //   0, 1, 2, 3, 4, 5, 6]
            // (c - x) - (c - y)
            // [ 0,-1,-2,-3,-4,-5,-6
            //   1, 0,-1,-2,-3,-4,-5
            //   2, 1, 0,-1,-2,-3,-4
            //   3, 2, 1, 0,-1,-2,-3
            //   4, 3, 2, 1, 0,-1,-2
            //   5, 4, 3, 2, 1, 0,-1
            //   6, 5, 4, 3, 2, 1, 0]
            // (c - x) - (y - c)
            // [ 6, 5, 4, 3, 2, 1, 0
            //   5, 4, 3, 2, 1, 0,-1
            //   4, 3, 2, 1, 0,-1,-2
            //   3, 2, 1, 0,-1,-2,-3
            //   2, 1, 0,-1,-2,-3,-4
            //   1, 0,-1,-2,-3,-4,-5
            //   0,-1,-2,-3,-4,-5,-6]
        );
    }
    return o;
}

chunky_pyramid=(a)=>{
    let o = [];
    let q = Math.sqrt(a.length); // sidelength
    let c = (q - 1) / 2; // center index
    while(o.length < a.length) {
        let p = o.length; // scanning position
        let x = p % q; // coordinates
        let y = Math.floor(p / q); // coordinates
        let d = Math.max(Math.abs(c - x), Math.abs(c - y)); // index absolute distance from center index
        o.push(
        // pyramid
            (c * (c + 1) * 4) - (d * (d + 1) * 4) +
        // chunks
            ((x + 1 > c + d) * (y < c + d) * d * 2) + // east
            ((y + 1 > c + d) * (x > c - d) * d * 4) + // south
            ((x - 1 < c - d) * (y > c - d) * d * 6) // west
        );
    }
    return o;
}

key=(a)=>{
    let o = [];
    let q = Math.sqrt(a.length); // sidelength
    let c = (q - 1) / 2; // center index
    while(o.length < a.length) {
        let p = o.length; // scanning position
        let x = p % q; // coordinates
        let y = Math.floor(p / q); // coordinates
        let d = Math.max(Math.abs(c - x), Math.abs(c - y)); // index absolute distance from center index
        // filters
        let n = (y - 1 < c - d) * (x < c + d);
        let e = (x + 1 > c + d) * (y < c + d);
        let s = (y + 1 > c + d) * (x > c - d);
        let w = (x - 1 < c - d) * (y > c - d);
        o.push(
        // pyramid
            (c * (c + 1) * 4) - (d * (d + 1) * 4)
        // chunks
            + (e * d * 2) // east
            + (s * d * 4) // south
            + (w * d * 6) // west

        // stairs
            + (n * ((c - y) - (c - x))) // north
            + (e * ((x - c) + (y - c))) // east
            + (s * ((c - x) - (c - y))) // south
            + (w * ((c - x) - (y - c))) // east
        );
    }
    return o;
}

cat=(a)=>{
    let o = [];
    let q = Math.sqrt(a.length); // sidelength
    let c = (q - 1) / 2; // center index
    while(o.length < a.length) {
        let p = o.length; // scanning position
        let x = p % q; // coordinates
        let y = Math.floor(p / q); // coordinates
        let d = Math.max(Math.abs(c - x), Math.abs(c - y)); // index absolute distance from center index
        // filters
        let n = (y - 1 < c - d) * (x < c + d);
        let e = (x + 1 > c + d) * (y < c + d);
        let s = (y + 1 > c + d) * (x > c - d);
        let w = (x - 1 < c - d) * (y > c - d);
        o.push(
            (c * (c + 1) * 4) - (d * (d + 1) * 4) +
            (n * ((c - y) - (c - x))) +
            (e * (((x - c) + (y - c)) + (d * 2))) +
            (s * (((c - x) - (c - y)) + (d * 4))) +
            (w * (((c - x) - (y - c)) + (d * 6)))
        );
    }
    return o;
}

softcat=(input_array)=>{
    let output_array = [];
    //────────────────────────────────────────────────────────┐
    //   -,-,-,-,-,-,S                                        │
    //   -,-,-,-,-,-,S                                        │
    //   -,-,-,-,-,-,S     S represents sidelength (1-based)  │
    //   -,-,-,C,-,-,S                                        │
    //   -,-,-,-,-,-,S     C represents center (0-based)      │
    //   -,-,-,-,-,-,S                                        │
    //   -,-,-,-,-,-,S                                        │
    //                                                        │
    let sidelength = Math.sqrt(input_array.length);        // │
    let center = (sidelength - 1) / 2;                     // │
    //────────────────────────────────────────────────────────┘
    while(output_array.length < input_array.length) {
        let p = output_array.length; // scanning position 0-based
        let x = p % sidelength; // coordinates 0-based
        let y = Math.floor(p / sidelength); // coordinates 0-based
        //──────────────────────────────────────────────────────────────────────────────────────────┐
        //   distance (d)       distance * 2       distance * 4              distance * 6           │
        //   3,3,3,3,3,3,3      6,6,6,6,6,6,6      12,12,12,12,12,12,12      18,18,18,18,18,18,18   │
        //   3,2,2,2,2,2,3      6,4,4,4,4,4,6      12, 8, 8, 8, 8, 8,12      18,12,12,12,12,12,18   │
        //   3,2,1,1,1,2,3      6,4,2,2,2,4,6      12, 8, 4, 4, 4, 8,12      18,12, 6, 6, 6,12,18   │
        //   3,2,1,0,1,2,3      6,4,2,0,2,4,6      12, 8, 4, 0, 4, 8,12      18,12, 6, 0, 6,12,18   │
        //   3,2,1,1,1,2,3      6,4,2,2,2,4,6      12, 8, 4, 4, 4, 8,12      18,12, 6, 6, 6,12,18   │
        //   3,2,2,2,2,2,3      6,4,4,4,4,4,6      12, 8, 8, 8, 8, 8,12      18,12,12,12,12,12,18   │
        //   3,3,3,3,3,3,3      6,6,6,6,6,6,6      12,12,12,12,12,12,12      18,18,18,18,18,18,18   │
        //                                                                                          │
        let distance = Math.max(Math.abs(center - x), Math.abs(center - y));                     // │
        //──────────────────────────────────────────────────────────────────────────────────────────┘
        //────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   north              east               south              west                                                    │
        //  (y - 1 < c - d)    (x + 1 > c + d)    (y + 1 > c + d)    (x - 1 < c - d)                                          │
        //   1,1,1,1,1,1,1      0,0,0,0,0,0,1      0,0,0,0,0,0,0      1,0,0,0,0,0,0                                           │
        //   0,1,1,1,1,1,0      0,0,0,0,0,1,1      0,0,0,0,0,0,0      1,1,0,0,0,0,0                                           │
        //   0,0,1,1,1,0,0      0,0,0,0,1,1,1      0,0,0,0,0,0,0      1,1,1,0,0,0,0                                           │
        //   0,0,0,1,0,0,0      0,0,0,1,1,1,1      0,0,0,1,0,0,0      1,1,1,1,0,0,0                                           │
        //   0,0,0,0,0,0,0      0,0,0,0,1,1,1      0,0,1,1,1,0,0      1,1,1,0,0,0,0                                           │
        //   0,0,0,0,0,0,0      0,0,0,0,0,1,1      0,1,1,1,1,1,0      1,1,0,0,0,0,0                                           │
        //   0,0,0,0,0,0,0      0,0,0,0,0,0,1      1,1,1,1,1,1,1      1,0,0,0,0,0,0                                           │
        //                                                                                                                    │
        let north = (1 + (Math.abs((center - distance) - ((y - 1) + 1/2)) / ((center - distance) - ((y - 1) + 1/2)))) / 2; // │
        let east =  (1 + (Math.abs((x + 1) - ((center + distance) + 1/2)) / ((x + 1) - ((center + distance) + 1/2)))) / 2; // │
        let south = (1 + (Math.abs((y + 1) - ((center + distance) + 1/2)) / ((y + 1) - ((center + distance) + 1/2)))) / 2; // │
        let west =  (1 + (Math.abs((center - distance) - ((x - 1) + 1/2)) / ((center - distance) - ((x - 1) + 1/2)))) / 2; // │
        //                                                                                                                    │
        //   negative east      negative south     negative west      negative north                                          │
        //   (x < c + d)        (y < c + d)        (x > c - d)        (y > c - d)                                             │
        //   1,1,1,1,1,1,0      1,1,1,1,1,1,1      0,1,1,1,1,1,1      0,0,0,0,0,0,0                                           │
        //   1,1,1,1,1,0,0      1,1,1,1,1,1,1      0,0,1,1,1,1,1      1,0,0,0,0,0,1                                           │
        //   1,1,1,1,0,0,0      1,1,1,1,1,1,1      0,0,0,1,1,1,1      1,1,0,0,0,1,1    each of these graphs is the inversion  │
        //   1,1,1,0,0,0,0      1,1,1,0,1,1,1      0,0,0,0,1,1,1      1,1,1,0,1,1,1                                           │
        //   1,1,1,1,0,0,0      1,1,0,0,0,1,1      0,0,0,1,1,1,1      1,1,1,1,1,1,1    of the graph above and to the right    │
        //   1,1,1,1,1,0,0      1,0,0,0,0,0,1      0,0,1,1,1,1,1      1,1,1,1,1,1,1                                           │
        //   1,1,1,1,1,1,0      0,0,0,0,0,0,0      0,1,1,1,1,1,1      1,1,1,1,1,1,1                                           │
        //                                                                                                                    │
        let negative_north = (1 + (Math.abs(y - ((center - distance) + 1/2)) / (y - ((center - distance) + 1/2)))) / 2;    // │
        let negative_east =  (1 + (Math.abs((center + distance) - (x + 1/2)) / ((center + distance) - (x + 1/2)))) / 2;    // │
        let negative_south = (1 + (Math.abs((center + distance) - (y + 1/2)) / ((center + distance) - (y + 1/2)))) / 2;    // │
        let negative_west =  (1 + (Math.abs(x - ((center - distance) + 1/2)) / (x - ((center - distance) + 1/2)))) / 2;    // │
        //                                                                                                                    │
        //   north filter       east filter        south filter       west filter                                             │
        //   1,1,1,1,1,1,0      0,0,0,0,0,0,1      0,0,0,0,0,0,0      0,0,0,0,0,0,0                                           │
        //   0,1,1,1,1,0,0      0,0,0,0,0,1,1      0,0,0,0,0,0,0      1,0,0,0,0,0,0                                           │
        //   0,0,1,1,0,0,0      0,0,0,0,1,1,1      0,0,0,0,0,0,0      1,1,0,0,0,0,0    each of these graphs is                │
        //   0,0,0,0,0,0,0      0,0,0,0,1,1,1      0,0,0,0,0,0,0      1,1,1,0,0,0,0                                           │
        //   0,0,0,0,0,0,0      0,0,0,0,0,1,1      0,0,0,1,1,0,0      1,1,1,0,0,0,0    the above two graphs multiplied        │
        //   0,0,0,0,0,0,0      0,0,0,0,0,0,1      0,0,1,1,1,1,0      1,1,0,0,0,0,0                                           │
        //   0,0,0,0,0,0,0      0,0,0,0,0,0,0      0,1,1,1,1,1,1      1,0,0,0,0,0,0                                           │
        //                                                                                                                    │
        let north_filter = north * negative_east;                                                                          // │
        let east_filter = east * negative_south;                                                                           // │
        let south_filter = south * negative_west;                                                                          // │
        let west_filter = west * negative_north;                                                                           // │
        //────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   northeast slope         southeast slope         southwest slope         northwest slope       │
        //   (c - y) - (c - x)       (x - c) + (y - c)       (c - x) - (c - y)       (c - x) - (y - c)     │
        //   0, 1, 2, 3, 4, 5, 6    -6,-5,-4,-3,-2,-1, 0     0,-1,-2,-3,-4,-5,-6     6, 5, 4, 3, 2, 1, 0   │
        //  -1, 0, 1, 2, 3, 4, 5    -5,-4,-3,-2,-1, 0, 1     1, 0,-1,-2,-3,-4,-5     5, 4, 3, 2, 1, 0,-1   │
        //  -2,-1, 0, 1, 2, 3, 4    -4,-3,-2,-1, 0, 1, 2     2, 1, 0,-1,-2,-3,-4     4, 3, 2, 1, 0,-1,-2   │
        //  -3,-2,-1, 0, 1, 2, 3    -3,-2,-1, 0, 1, 2, 3     3, 2, 1, 0,-1,-2,-3     3, 2, 1, 0,-1,-2,-3   │
        //  -4,-3,-2,-1, 0, 1, 2    -2,-1, 0, 1, 2, 3, 4     4, 3, 2, 1, 0,-1,-2     2, 1, 0,-1,-2,-3,-4   │
        //  -5,-4,-3,-2,-1, 0, 1    -1, 0, 1, 2, 3, 4, 5     5, 4, 3, 2, 1, 0,-1     1, 0,-1,-2,-3,-4,-5   │
        //  -6,-5,-4,-3,-2,-1, 0     0, 1, 2, 3, 4, 5, 6     6, 5, 4, 3, 2, 1, 0     0,-1,-2,-3,-4,-5,-6   │
        //                                                                                                 │
        let northeast_slope = (center - y) - (center - x);                                              // │
        let southeast_slope = (x - center) + (y - center);                                              // │
        let southwest_slope = (center - x) - (center - y);                                              // │
        let northwest_slope = (center - x) - (y - center);                                              // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   northeast slope     southeast slope     southwest slope     northwest slope                   │
        //   * north filter      * east filter       * south filter      * west filter       propeller     │
        //   0,1,2,3,4,5,0       0,0,0,0,0,0,0       0,0,0,0,0,0,0       0,0,0,0,0,0,0       0,1,2,3,4,5,0 │
        //   0,0,1,2,3,0,0       0,0,0,0,0,0,1       0,0,0,0,0,0,0       5,0,0,0,0,0,0       5,0,1,2,3,0,1 │
        //   0,0,0,1,0,0,0       0,0,0,0,0,1,2       0,0,0,0,0,0,0       4,3,0,0,0,0,0       4,3,0,1,0,1,2 │
        //   0,0,0,0,0,0,0   +   0,0,0,0,1,2,3   +   0,0,0,0,0,0,0   +   3,2,1,0,0,0,0   =   3,2,1,0,1,2,3 │
        //   0,0,0,0,0,0,0       0,0,0,0,0,3,4       0,0,0,1,0,0,0       2,1,0,0,0,0,0       2,1,0,1,0,3,4 │
        //   0,0,0,0,0,0,0       0,0,0,0,0,0,5       0,0,3,2,1,0,0       1,0,0,0,0,0,0       1,0,3,2,1,0,5 │
        //   0,0,0,0,0,0,0       0,0,0,0,0,0,0       0,5,4,3,2,1,0       0,0,0,0,0,0,0       0,5,4,3,2,1,0 │
        //                                                                                                 │
        let propeller = (northeast_slope * north_filter) +                                              // │
                        (southeast_slope * east_filter) +                                               // │
                        (southwest_slope * south_filter) +                                              // │
                        (northwest_slope * west_filter)                                                 // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   distance * 2        distance * 4              distance * 6                                    │
        //   * east filter       * south filter            * west filter              wave                 │
        //   0,0,0,0,0,0,6       0, 0, 0, 0, 0, 0, 0        0, 0, 0, 0, 0, 0, 0        0, 0, 0, 0, 0, 0, 6 │
        //   0,0,0,0,0,4,6       0, 0, 0, 0, 0, 0, 0       18, 0, 0, 0, 0, 0, 0       18, 0, 0, 0, 0, 4, 6 │
        //   0,0,0,0,2,4,6       0, 0, 0, 0, 0, 0, 0       18,12, 0, 0, 0, 0, 0       18,12, 0, 0, 2, 4, 6 │
        //   0,0,0,0,2,4,6   +   0, 0, 0, 0, 0, 0, 0   +   18,12, 6, 0, 0, 0, 0   =   18,12, 6, 0, 2, 4, 6 │
        //   0,0,0,0,0,4,6       0, 0, 0, 4, 4, 0, 0       18,12, 6, 0, 0, 0, 0       18,12, 6, 4, 4, 4, 6 │
        //   0,0,0,0,0,0,6       0, 0, 8, 8, 8, 8, 0       18,12, 0, 0, 0, 0, 0       18,12, 8, 8, 8, 8, 6 │
        //   0,0,0,0,0,0,0       0,12,12,12,12,12,12       18, 0, 0, 0, 0, 0, 0       18,12,12,12,12,12,12 │
        //                                                                                                 │
        let wave = (distance * 2 * east_filter) +                                                       // │
                   (distance * 4 * south_filter) +                                                      // │
                   (distance * 6 * west_filter)                                                         // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        //─────────────────────────────────────────────────────────────────────────────────────────────────┐
        //   pyramid                "rings"                                                                │
        //   0, 0, 0, 0, 0, 0,0     ┌─────────────24┐     the value at a point in the "pyramid"            │
        //   0,24,24,24,24,24,0     │ ┌─────────16┐ │                                                      │
        //   0,24,40,40,40,24,0     │ │ ┌──────8┐ │ │     is equal to the sum of the number of points      │
        //   0,24,40,48,40,24,0     │ │ │   •   │ │ │                                                      │
        //   0,24,40,40,40,24,0     │ │ └───────┘ │ │     in the "rings" exterior to that point            │
        //   0,24,24,24,24,24,0     │ └───────────┘ │                                                      │
        //   0, 0, 0, 0, 0, 0,0     └───────────────┘     ( 24,      24 + 16,       24 + 16 + 8 )          │
        //                                                                                                 │
        let pyramid = (center * (center + 1) * 4) - (distance * (distance + 1) * 4);                    // │
        //─────────────────────────────────────────────────────────────────────────────────────────────────┘
        output_array.push(
            input_array[
                propeller + wave + pyramid
            ]
        )
    }
    return output_array;
}

wildcat=(a)=>{
    let o = [];
    let q = Math.sqrt(a.length); // sidelength
    let c = (q - 1) / 2; // center index
    while(o.length < a.length) {
        let p = o.length; // scanning position
        let x = p % q; // coordinates
        let y = Math.floor(p / q); // coordinates
        let d = Math.max(Math.abs(c - x), Math.abs(c - y)); // index absolute distance from center index
        let north = (1 + (Math.abs((c - d) - ((y - 1) + 1/2)) / ((c - d) - ((y - 1) + 1/2)))) / 2;
        let east =  (1 + (Math.abs((x + 1) - ((c + d) + 1/2)) / ((x + 1) - ((c + d) + 1/2)))) / 2;
        let south = (1 + (Math.abs((y + 1) - ((c + d) + 1/2)) / ((y + 1) - ((c + d) + 1/2)))) / 2;
        let west =  (1 + (Math.abs((c - d) - ((x - 1) + 1/2)) / ((c - d) - ((x - 1) + 1/2)))) / 2;
        let negative_north = (1 + (Math.abs(y - ((c - d) + 1/2)) / (y - ((c - d) + 1/2)))) / 2;
        let negative_east =  (1 + (Math.abs((c + d) - (x + 1/2)) / ((c + d) - (x + 1/2)))) / 2;
        let negative_south = (1 + (Math.abs((c + d) - (y + 1/2)) / ((c + d) - (y + 1/2)))) / 2;
        let negative_west =  (1 + (Math.abs(x - ((c - d) + 1/2)) / (x - ((c - d) + 1/2)))) / 2;
        let n = north * negative_east;
        let e = east * negative_south;
        let s = south * negative_west;
        let w = west * negative_north;
        o.push(
            a[
                (c * (c + 1) * 4) - (d * (d + 1) * 4) +
                (n * ((c - y) - (c - x))) +
                (e * (((x - c) + (y - c)) + (d * 2))) +
                (s * (((c - x) - (c - y)) + (d * 4))) +
                (w * (((c - x) - (y - c)) + (d * 6)))
            ]
        )
    }
    return o;
}

// filters
// n * -e: (y - 1 < c - d) * (x < c + d)
// e * -s: (x + 1 > c + d) * (y < c + d)
// s * -w: (y + 1 > c + d) * (x > c - d)
// w * -n: (x - 1 < c - d) * (y > c - d)

// convert position to coordinates
// y = Math.floor(p / Math.sqrt(a.length));
// x = p % Math.sqrt(a.length);

// convert coordinates to position
// - if(x == 0 && y == 0) e == 1, p == 0;
// - if(x == 2 && y == 0) e == 3, p == 2;
// - if(x == 0 && y == 2) e == 7, p == 6;
// - if(x == 2 && y == 2) e == 9, p == 8;
// charAt((y*Math.sqrt(a.length))+x);
// (y*Math.sqrt(a.length))+x;