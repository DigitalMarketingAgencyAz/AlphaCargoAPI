import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Импортируем ваш сервис Prisma
import axios from 'axios';
import { GetParcelDto } from './dto/base-parcel-dto';
import { authorization } from './constants';
@Injectable()
export class ParcelsService {
  constructor(private prisma: PrismaService) {}

  private getCurrentDate() {
    const currentDate = new Date();
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}000000`;
    };
    const DateEnd = formatDate(currentDate);
    const DateStart = formatDate(
      new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)),
    );
    return { DateEnd, DateStart };
  }
  async findAll(PhoneNumber: string): Promise<GetParcelDto[]> {
    const { DateEnd, DateStart } = this.getCurrentDate();
    const options = {
      method: 'POST',
      url: 'http://212.2.231.34/alpha_cargo/hs/shipment_history',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      data: {
        PhoneNumber,
        DateStart,
        DateEnd,
      },
    };
    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async findOneByInvoiceNumber(InvoiceNumber: string): Promise<GetParcelDto> {
    const options = {
      method: 'POST',
      url: 'http://212.2.231.34/alpha_cargo/hs/shipment_status',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      data: {
        InvoiceNumber,
      },
    };
    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async getInvoicePdf(invoiceNumber: string): Promise<Buffer> {
    const options = {
      method: 'POST',
      url: 'http://212.2.231.34/alpha_cargo/hs/get_pdf',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      data: {
        InvoiceNumber: invoiceNumber,
      },
    };

    try {
      const { data } = await axios.request(options);
      if (!data || !data.pdf) {
        throw new NotFoundException('PDF не найден');
      }

      const pdfBuffer = data.pdf;
      return pdfBuffer;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('PDF не найден');
    }
  }
}
