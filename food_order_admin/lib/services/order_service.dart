import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/order.dart';

class OrderService {
  Future<List<Order>> getOrders({
    DateTime? startDate,
    DateTime? endDate,
    String? status,
  }) async {
    final queryParams = <String, String>{};
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
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((json) => Order.fromJson(json)).toList();
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
}