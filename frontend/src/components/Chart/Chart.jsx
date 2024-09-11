import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getInvoives } from '../../services/InvoiceService';

const Chart = () => {
  const [data, setData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const RADIAN = Math.PI / 180;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getAllInvoices = async () => {
    try {
      const res = await getInvoives();
      const aggregatedData = res.reduce((acc, invoice) => {
        invoice.items.forEach(({ product: { name }, quantity, price }) => {
          if (acc[name]) {
            acc[name].sales += quantity;
            acc[name].revenue += price * quantity;
          } else {
            acc[name] = { name, sales: quantity, revenue: price * quantity };
          }
        });
        return acc;
      }, {});

      const formattedData = Object.values(aggregatedData);
      const topSellingProducts = formattedData.sort((a, b) => b.sales - a.sales).slice(0, 10);

      setData(formattedData);
      setTopProducts(topSellingProducts);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    getAllInvoices();
  }, []);


  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='flex flex-col lg:flex-row items-center justify-center text-center'>
      <div className='w-full lg:w-1/2 border-[1px] rounded-xl overflow-hidden border-[#b8babe] '>
        <div className='bg-[#F9F9FB] p-2 flex items-center justify-center border-b-[1px] border-[#b8babe] mb-4'>
          <h2 className='text-lg font-semibold'>Top Selling Products</h2>
        </div>
        <div>
          { }
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topProducts}
              dataKey="sales"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {topProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='w-full lg:w-1/2 border-[1px] rounded-xl overflow-hidden border-[#b8babe]'>
        <div className='bg-[#F9F9FB] p-2 flex items-center justify-center border-b-[1px] mb-4 border-[#b8babe]'>
          <h2 className='text-lg font-semibold bg-[#F9F9FB] '>Sales And Revenue</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="sales" />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#1677FF" />
            <Bar dataKey="revenue" fill="#43A047" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
