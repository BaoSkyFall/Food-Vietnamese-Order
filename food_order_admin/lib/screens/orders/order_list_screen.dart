import 'package:flutter/material.dart';
import '../../models/order.dart';
import '../../services/order_service.dart';
import '../../widgets/order_card.dart'; // Add this import
import '../../widgets/status_badge.dart';

class OrdersListScreen extends StatefulWidget {
  @override
  _OrdersListScreenState createState() => _OrdersListScreenState();
}

class _OrdersListScreenState extends State<OrdersListScreen> {
  final _orderService = OrderService();
  List<Order> _orders = [];
  DateTimeRange? _dateRange;
  String? _statusFilter;

  @override
  void initState() {
    super.initState();
    _loadOrders();
  }

  Future<void> _loadOrders() async {
    try {
      final orders = await _orderService.getOrders(
        startDate: _dateRange?.start,
        endDate: _dateRange?.end,
        status: _statusFilter,
      );
      setState(() => _orders = orders.orders);
    } catch (e) {
      print('Error loading orders: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to load orders: ${e.toString()}'),
            duration: Duration(seconds: 3),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Đơn Hàng'),
        actions: [
          IconButton(
            icon: Icon(Icons.filter_list),
            onPressed: () => _showFilterDialog(),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _loadOrders,
        child: ListView.builder(
          itemCount: _orders.length,
          itemBuilder: (context, index) {
            final order = _orders[index];
            return OrderCard(
              order: order,
              onTap: () => _loadOrders(),
              onDelete: () async {
                try {
                  await _orderService.deleteOrder(order.id);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Đơn hàng đã được xóa thành công')),
                  );
                  _loadOrders();
                } catch (e) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Không thể xóa đơn hàng: ${e.toString()}')),
                  );
                }
              },
            );
          },
        ),
      ),
    );
  }

  void _showFilterDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Filter Orders'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ElevatedButton(
              onPressed: () async {
                final range = await showDateRangePicker(
                  context: context,
                  firstDate: DateTime(2020),
                  lastDate: DateTime.now(),
                );
                if (range != null) {
                  setState(() => _dateRange = range);
                  _loadOrders();
                }
              },
              child: Text('Select Date Range'),
            ),
            DropdownButton<String>(
              value: _statusFilter,
              items: ['All', 'Pending', 'Completed', 'Cancelled']
                  .map((status) => DropdownMenuItem(
                        value: status == 'All' ? null : status.toLowerCase(),
                        child: Text(status),
                      ))
                  .toList(),
              onChanged: (value) {
                setState(() => _statusFilter = value);
                _loadOrders();
              },
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              setState(() {
                _dateRange = null;
                _statusFilter = null;
              });
              _loadOrders();
              Navigator.pop(context);
            },
            child: Text('Clear Filters'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
        ],
      ),
    );
  }
}
