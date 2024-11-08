<?php

namespace VehicleManagement;

// Trait untuk fitur kendaraan listrik
trait Electric {
    private $batteryCapacity;

    public function setBatteryCapacity($capacity) {
        $this->batteryCapacity = $capacity;
    }

    public function getBatteryCapacity() {
        return $this->batteryCapacity;
    }
}

// Abstract class kendaraan
abstract class Vehicle {
    protected $brand;
    protected $model;

    public function __construct($brand, $model) {
        $this->brand = $brand;
        $this->model = $model;
    }

    abstract public function getInfo();

    public function __toString() {
        return "Brand: $this->brand, Model: $this->model";
    }
}

// Class Car
class Car extends Vehicle {
    use Electric;

    private $numDoors;

    public function __construct($brand, $model, $numDoors) {
        parent::__construct($brand, $model);
        $this->numDoors = $numDoors;
    }

    public function getInfo() {
        return "Car - " . $this->__toString() . ", Number of Doors: $this->numDoors, Battery: " . $this->getBatteryCapacity() . " kWh";
    }
}

// Class Bike
class Bike extends Vehicle {
    private $type;

    public function __construct($brand, $model, $type) {
        parent::__construct($brand, $model);
        $this->type = $type;
    }

    public function getInfo() {
        return "Bike - " . $this->__toString() . ", Type: $this->type";
    }
}

// Penggunaan
$car = new Car("Tesla", "Model S", 4);
$car->setBatteryCapacity(100);

$bike = new Bike("Yamaha", "MT-15", "Sport");

echo $car->getInfo() . PHP_EOL;
echo $bike->getInfo() . PHP_EOL;

?>