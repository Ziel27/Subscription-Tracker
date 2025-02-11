import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription Name is required"],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, "Subscription Price is required"],
        min: [0, "Price must be greater than 0"],
    },
    curency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "PHP"],
        default: "USD",
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "annually"],
        default: "monthly",
    },
    category: {
        type: String,
        enum: ["streaming", "gaming", "music", "news", "other"],
        required: [true, "Category is required"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment Method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "canceled", "expired"],
        default: "active",
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        maxlength: 50,
        minlength: 5,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    startDate: {
        type: Date,
        required: [true, "Start Date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start Date must be in the past",
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: "Renewal Date must be after Start Date",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
} , {timestamps: true});


//auto calculate renewal date if not provided
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            annually: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
