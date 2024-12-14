class Order {
  final String id;
  final CustomerInfo customerInfo;
  final List<OrderItem> items;
  final double total;
  final String status;
  final DateTime orderDate;
  final List<OrderNote> notes;

  Order({
    required this.id,
    required this.customerInfo,
    required this.items,
    required this.total,
    required this.status,
    required this.orderDate,
    required this.notes,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['_id'],
      customerInfo: CustomerInfo.fromJson(json['customerInfo']),
      items: (json['items'] as List)
          .map((item) => OrderItem.fromJson(item))
          .toList(),
      total: double.parse(json['total'].toString()),
      status: json['status'],
      orderDate: DateTime.parse(json['orderDate']),
      notes: (json['notes'] as List)
          .map((note) => OrderNote.fromJson(note))
          .toList(),
    );
  }
}

class CustomerInfo {
  final String name;
  final String phone;
  final String address;
  final String? note;

  CustomerInfo({
    required this.name,
    required this.phone,
    required this.address,
    this.note,
  });

  factory CustomerInfo.fromJson(Map<String, dynamic> json) {
    return CustomerInfo(
      name: json['name'],
      phone: json['phone'],
      address: json['address'],
      note: json['note'],
    );
  }
}

class OrderItem {
  final String id;
  final String name;
  final double price;
  final int quantity;

  OrderItem({
    required this.id,
    required this.name,
    required this.price,
    required this.quantity,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    try {
    
    // Remove currency symbol 'đ' and thousand separators ','
    String priceStr = json['price'].toString()
        .replaceAll('đ', '')
        .replaceAll('₫', '')
        .replaceAll(',', '')
        .trim();
    
    double priceConverted = double.parse(priceStr.toString());

    return OrderItem(
      id: json['_id'],
      name: json['name'],
      price: priceConverted,
      quantity: json['quantity'],
    );
  } catch (e) {
    // Return a default value or rethrow the error
    return OrderItem(
      id: json['_id'],
      name: json['name'],
      price: 0.0,  // Default price
      quantity: json['quantity'],
    );
  }
  }
}

class OrderNote {
  final String id;
  final String text;
  final DateTime createdAt;

  OrderNote({
    required this.id,
    required this.text,
    required this.createdAt,
  });

  factory OrderNote.fromJson(Map<String, dynamic> json) {
    return OrderNote(
      id: json['_id'],
      text: json['text'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}