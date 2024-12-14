import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/order.dart';

class OrderResponse {
  final List<Order> orders;
  final Pagination pagination;

  OrderResponse({
    required this.orders,
    required this.pagination,
  });

  factory OrderResponse.fromJson(Map<String, dynamic> json) {
    return OrderResponse(
      orders: (json['orders'] as List)
          .map((orderJson) => Order.fromJson(orderJson))
          .toList(),
      pagination: Pagination.fromJson(json['pagination']),
    );
  }
}

class Pagination {
  final int total;
  final int page;
  final int pages;

  Pagination({
    required this.total,
    required this.page,
    required this.pages,
  });

  factory Pagination.fromJson(Map<String, dynamic> json) {
    return Pagination(
      total: json['total'],
      page: json['page'],
      pages: json['pages'],
    );
  }
}

class OrderService {
  Future<OrderResponse> getOrders({
    DateTime? startDate,
    DateTime? endDate,
    String? status,
    int page = 1,
    int limit = 1000,
  }) async {
    final queryParams = <String, String>{
      'page': page.toString(),
      'limit': limit.toString(),
    };
    
    if (startDate != null) {
      queryParams['startDate'] = startDate.toIso8601String();
    }
    if (endDate != null) {
      queryParams['endDate'] = endDate.toIso8601String();
    }
    if (status != null) {
      queryParams['status'] = status;
    }

    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}/orders').replace(queryParameters: queryParams),
      headers: ApiConfig.headers,
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(response.body);
      return OrderResponse.fromJson(data);
    } else {
      throw Exception('Failed to load orders');
    }
  }

  Future<Order> getOrderDetails(String orderId) async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}/orders/$orderId'),
      headers: ApiConfig.headers,
    );

    if (response.statusCode == 200) {
      return Order.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load order details');
    }
  }

  Future<void> updateOrderStatus(String orderId, String status) async {
    final response = await http.patch(
      Uri.parse('${ApiConfig.baseUrl}/orders/$orderId/status'),
      headers: ApiConfig.headers,
      body: jsonEncode({'status': status}),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update order status');
    }
  }

  Future<void> addOrderNote(String orderId, String text) async {
    final response = await http.post(
      Uri.parse('${ApiConfig.baseUrl}/orders/$orderId/notes'),
      headers: ApiConfig.headers,
      body: jsonEncode({'text': text}),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to add note');
    }
  }

  Future<void> deleteOrder(String orderId) async {
    try {
      final response = await http.delete(
        Uri.parse('${ApiConfig.baseUrl}/orders/$orderId'),
        headers: ApiConfig.headers,
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to delete order');
      }
    } catch (e) {
      throw Exception('Failed to delete order: $e');
    }
  }
}