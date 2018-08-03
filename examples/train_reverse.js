const LPF2 = require("..");

const lpf2 = new LPF2.LPF2();
lpf2.scan(); // Start scanning for trains

// Change these to make the train behave as you want
const FORWARD_DIRECTION_COLOR = LPF2.Consts.Colors.YELLOW;
const BACKWARDS_DIRECTION_COLOR = LPF2.Consts.Colors.RED;
const TRAIN_SPEED = 40;
const STOP_DELAY = 2000;
const TRAIN_MOTOR_PORT = "A";

console.log("Looking for trains...");

lpf2.on("discover", async (hub) => { // Wait to discover a train

    let moving = true;

    await hub.connect(); // Connect to train
    console.log(`Connected to ${hub.name}!`);

    await hub.wait(2000); // Wait two seconds before starting the train
    hub.setMotorSpeed(TRAIN_MOTOR_PORT, TRAIN_SPEED);

    hub.on("color", async (port, color) => {

        if (color === FORWARD_DIRECTION_COLOR && moving) { // If yellow is seen, stop the train, wait seconds, and reverse direction

            moving = false;
            hub.setMotorSpeed(TRAIN_MOTOR_PORT, 0);
            await hub.sleep(STOP_DELAY);
            hub.setMotorSpeed(TRAIN_MOTOR_PORT, -TRAIN_SPEED);
            await hub.sleep(2000);
            moving = true;

        } else if (color === BACKWARDS_DIRECTION_COLOR && moving) { // If red is seen, stop the train, wait seconds, and reverse direction

            moving = false;
            hub.setMotorSpeed(TRAIN_MOTOR_PORT, 0);
            await hub.sleep(STOP_DELAY);
            hub.setMotorSpeed(TRAIN_MOTOR_PORT, -TRAIN_SPEED);
            await hub.sleep(2000);
            moving = true;

        }

    });

});