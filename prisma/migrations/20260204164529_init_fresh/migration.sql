-- CreateTable
CREATE TABLE "ota_payloads" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "ota_name" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "request_signature" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "fetched_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canonical_name" TEXT NOT NULL,
    "normalized_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "star_rating" INTEGER,
    "property_type" TEXT,
    "description" TEXT,
    "primary_image_url" TEXT,
    "review_score" DECIMAL,
    "review_count" INTEGER,
    "quality_score" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ota_hotels" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "hotel_id" TEXT NOT NULL,
    "ota_name" TEXT NOT NULL,
    "ota_hotel_id" TEXT NOT NULL,
    "match_confidence" DECIMAL,
    CONSTRAINT "ota_hotels_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "hotel_images" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "hotel_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "source_ota" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER,
    CONSTRAINT "hotel_images_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "amenities_master" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "icon_key" TEXT
);

-- CreateTable
CREATE TABLE "hotel_amenities" (
    "hotel_id" TEXT NOT NULL,
    "amenity_id" INTEGER NOT NULL,

    PRIMARY KEY ("hotel_id", "amenity_id"),
    CONSTRAINT "hotel_amenities_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "hotel_amenities_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "amenities_master" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "room_types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hotel_id" TEXT NOT NULL,
    "canonical_name" TEXT NOT NULL,
    "room_class" TEXT,
    "max_guests" INTEGER,
    "bed_configuration" TEXT,
    "room_size_sqft" INTEGER,
    CONSTRAINT "room_types_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ota_room_aliases" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "room_type_id" TEXT NOT NULL,
    "ota_name" TEXT NOT NULL,
    "ota_room_name" TEXT NOT NULL,
    "confidence_score" DECIMAL,
    CONSTRAINT "ota_room_aliases_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "room_rates" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "room_type_id" TEXT NOT NULL,
    "ota_name" TEXT NOT NULL,
    "checkin" DATETIME NOT NULL,
    "checkout" DATETIME NOT NULL,
    "base_price" DECIMAL NOT NULL,
    "taxes" DECIMAL,
    "currency" TEXT NOT NULL,
    "refundable" BOOLEAN,
    "availability" INTEGER,
    "booking_url" TEXT NOT NULL,
    "last_updated" DATETIME NOT NULL,
    CONSTRAINT "room_rates_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "search_snapshots" (
    "search_hash" TEXT NOT NULL PRIMARY KEY,
    "search_params" TEXT NOT NULL,
    "hotel_ids" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hotels_slug_key" ON "hotels"("slug");

-- CreateIndex
CREATE INDEX "hotels_city_idx" ON "hotels"("city");

-- CreateIndex
CREATE INDEX "hotels_slug_idx" ON "hotels"("slug");

-- CreateIndex
CREATE INDEX "room_types_hotel_id_idx" ON "room_types"("hotel_id");

-- CreateIndex
CREATE INDEX "room_rates_room_type_id_ota_name_idx" ON "room_rates"("room_type_id", "ota_name");

-- CreateIndex
CREATE INDEX "room_rates_checkin_checkout_idx" ON "room_rates"("checkin", "checkout");

-- CreateIndex
CREATE INDEX "search_snapshots_expires_at_idx" ON "search_snapshots"("expires_at");
