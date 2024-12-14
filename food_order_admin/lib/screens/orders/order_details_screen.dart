import 'package:flutter/material.dart';
import '../../models/order.dart';
import '../../services/order_service.dart';
import '../../widgets/status_badge.dart';

class OrderDetailsScreen extends StatefulWidget {
  final String orderId;

  const OrderDetailsScreen({
    Key? key,
    required this.orderId,
  }) : super(key: key);

  @override
  _OrderDetailsScreenState createState() => _OrderDetailsScreenState();
}

class _OrderDetailsScreenState extends State<OrderDetailsScreen> {
  final _orderService = OrderService();
  final _noteController = TextEditingController();
  Order? _order;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadOrderDetails();
  }

  Future<void> _loadOrderDetails() async {
    try {
      final order = await _orderService.getOrderDetails(widget.orderId);
      setState(() => _order = order);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load order details')),
      );
    }
  }

  Future<void> _updateStatus(String status) async {
    setState(() => _isLoading = true);
    try {
      await _orderService.updateOrderStatus(widget.orderId, status);
      await _loadOrderDetails();
      Navigator.pop(context, true);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to update status')),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _addNote() async {
    if (_noteController.text.isEmpty) return;

    setState(() => _isLoading = true);
    try {
      await _orderService.addOrderNote(widget.orderId, _noteController.text);
      _noteController.clear();
      await _loadOrderDetails();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to add note')),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_order == null) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Chi tiết đơn hàng'),
          leading: IconButton(
            icon: Icon(Icons.arrow_back),
            onPressed: () => Navigator.pop(context, true),
          ),
        ),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Mã Đơn #${_order!.id.substring(_order!.id.length - 4, _order!.id.length).toUpperCase()}'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context, true),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text('Trạng Thái Đơn Hàng: '),
                StatusBadge(status: _order!.status),
              ],
            ),
            Text('Ngày đặt: ${_order!.orderDate}'),
            Divider(),
            Text('Thông Tin Khách Hàng',
                style: Theme.of(context).textTheme.titleLarge),
            Text('Tên: ${_order!.customerInfo.name}'),
            Text('Số điện thoại: ${_order!.customerInfo.phone}'),
            Text('Địa chỉ: ${_order!.customerInfo.address}'),
            Divider(),
            Text('Món Ăn', style: Theme.of(context).textTheme.titleLarge),
            ListView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemCount: _order!.items.length,
              itemBuilder: (context, index) {
                final item = _order!.items[index];
                return ListTile(
                  title: Text(item.name),
                  subtitle: Text('${item.quantity}x @ ${item.price}'),
                  trailing: Text('${item.quantity * item.price}'),
                );
              },
            ),
            Divider(),
            Text('Tổng tiềnn: ${_order!.total}',
                style: Theme.of(context).textTheme.titleLarge),
            Divider(),
            Text('Ghi Chú', style: Theme.of(context).textTheme.titleLarge),
            TextField(
              controller: _noteController,
              decoration: InputDecoration(
                hintText: 'Thêm ghi chú...',
                suffixIcon: IconButton(
                  icon: Icon(Icons.send),
                  onPressed: _addNote,
                ),
              ),
            ),
            ListView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemCount: _order!.notes.length,
              itemBuilder: (context, index) {
                final note = _order!.notes[index];
                return ListTile(
                  title: Text(note.text),
                  subtitle: Text(note.createdAt.toString()),
                );
              },
            ),
            Divider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed:
                      _isLoading ? null : () => _updateStatus('cancelled'),
                  child: Text('Hủy Đơn Hàng'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                  ),
                ),
                ElevatedButton(
                  onPressed:
                      _isLoading ? null : () => _updateStatus('completed'),
                  child: Text('Đánh dấu hoàn thành'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
