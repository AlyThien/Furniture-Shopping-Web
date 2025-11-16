// Simple demo data + interactions for admin page
document.addEventListener('DOMContentLoaded', ()=>{

    // demo orders and products
    let orders = [
        {id:1001, customer:'Nguyễn A', date:'2025-10-20', total:1250000, status:'Pending'},
        {id:1002, customer:'Trần B', date:'2025-10-21', total:850000, status:'Shipped'},
        {id:1003, customer:'Lê C', date:'2025-10-22', total:2300000, status:'Pending'}
    ];
    let products = [
        {sku:'P-001', name:'Sofa Green', price:750000, qty:5},
        {sku:'P-002', name:'Dining Table', price:1200000, qty:2},
        {sku:'P-003', name:'Pouf', price:300000, qty:10}
    ];

    // elements
    const ordersBody = document.getElementById('orders-body');
    const inventoryBody = document.getElementById('inventory-body');
    const reportBody = document.getElementById('report-body');
    const reportTotal = document.getElementById('report-total');
    const reportCount = document.getElementById('report-count');

    // render functions
    function formatVND(n){ return new Intl.NumberFormat('vi-VN').format(n) + '₫'; }

    function renderOrders(){
        ordersBody.innerHTML = '';
        orders.forEach(o=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${o.id}</td>
                <td>${o.customer}</td>
                <td>${o.date}</td>
                <td>${formatVND(o.total)}</td>
                <td>${o.status}</td>
                <td>
                    <button class="action-btn" data-id="${o.id}" data-action="toggle">${ o.status === 'Pending' ? 'Đánh dấu đã gửi' : 'Đặt lại Pending' }</button>
                    <button class="action-btn" data-id="${o.id}" data-action="view">Chi tiết</button>
                </td>
            `;
            ordersBody.appendChild(tr);
        });
    }

    function renderInventory(filter=''){
        inventoryBody.innerHTML = '';
        products.filter(p=> p.name.toLowerCase().includes(filter.toLowerCase()) || p.sku.toLowerCase().includes(filter.toLowerCase()))
            .forEach(p=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.sku}</td>
                <td>${p.name}</td>
                <td>${formatVND(p.price)}</td>
                <td><input data-sku="${p.sku}" type="number" min="0" value="${p.qty}" style="width:80px;padding:6px;border-radius:6px;border:1px solid rgba(232,243,222,0.06);background:transparent;color:inherit" /></td>
            `;
            inventoryBody.appendChild(tr);
        });
    }

    function runReport(from, to){
        const fromT = from ? new Date(from) : null;
        const toT = to ? new Date(to) : null;
        const filtered = orders.filter(o=>{
            const d = new Date(o.date);
            if (fromT && d < fromT) return false;
            if (toT && d > toT) return false;
            return true;
        });
        reportBody.innerHTML = '';
        let total = 0;
        filtered.forEach(o=>{
            total += o.total;
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${o.id}</td><td>${o.date}</td><td>${o.customer}</td><td>${formatVND(o.total)}</td><td>${o.status}</td>`;
            reportBody.appendChild(tr);
        });
        reportTotal.textContent = formatVND(total);
        reportCount.textContent = filtered.length;
    }

    // initial render
    renderOrders();
    renderInventory();
    runReport();

    // sidebar navigation
    document.querySelectorAll('.admin-sidebar nav button').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            document.querySelectorAll('.admin-sidebar nav button').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            document.querySelectorAll('.admin-view').forEach(s=> s.style.display = 'none');
            document.getElementById('view-'+view).style.display = '';
            document.getElementById('page-title').textContent = btn.textContent;
            // rerender if needed
            if(view==='orders') renderOrders();
            if(view==='inventory') renderInventory();
            if(view==='reports') runReport(document.getElementById('report-from').value, document.getElementById('report-to').value);
        });
    });

    // order actions (event delegation)
    ordersBody.addEventListener('click', (e)=>{
        const btn = e.target.closest('button');
        if(!btn) return;
        const id = Number(btn.dataset.id);
        const action = btn.dataset.action;
        if(action === 'toggle'){
            const o = orders.find(x=>x.id===id);
            if(o) o.status = (o.status === 'Pending' ? 'Shipped' : 'Pending');
            renderOrders();
        } else if(action === 'view'){
            const o = orders.find(x=>x.id===id);
            if(o) alert(`Đơn hàng #${o.id}\nKhách: ${o.customer}\nNgày: ${o.date}\nTrị giá: ${formatVND(o.total)}\nTrạng thái: ${o.status}`);
        }
    });

    // inventory save
    document.getElementById('save-inventory').addEventListener('click', ()=>{
        document.querySelectorAll('#inventory-body input[data-sku]').forEach(inp=>{
            const sku = inp.dataset.sku;
            const p = products.find(x=>x.sku===sku);
            if(p) p.qty = Math.max(0, Number(inp.value));
        });
        alert('Đã lưu kho.');
        renderInventory(document.getElementById('prod-filter').value);
    });

    document.getElementById('prod-filter').addEventListener('input', (e)=>{
        renderInventory(e.target.value);
    });

    // report controls
    document.getElementById('btn-run-report').addEventListener('click', ()=>{
        runReport(document.getElementById('report-from').value, document.getElementById('report-to').value);
    });

    // refresh button (re-render)
    document.getElementById('refreshBtn').addEventListener('click', ()=>{
        renderOrders(); renderInventory(); runReport();
    });

});