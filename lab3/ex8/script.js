function foo() {
    if (arguments.length < 2) {
        console.log("Not enough arguments!");
        return;
    }
    for (a of arguments) {
        if (typeof a != 'number') {
            console.log("Arguments need to be numbers");
            return;
        }
    }
    let mx = arguments[0];
    for (a of arguments) {
        if (a > mx) {
            mx = a;
        }
    }
    console.log(mx);
    return mx;
}

foo(1, 2, 3, 4);
foo(1);
foo(1, '5', "42");
foo(1, 2);
foo(-10, -1, -5);
foo(5, 6, 7);