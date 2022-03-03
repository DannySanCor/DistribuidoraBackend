import { OrdersService } from './orders.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/order.dto';
import { Public } from 'src/auth/custom-decorator';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Not Authorize' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('/create')
  async createOrder(@Res() res, @Body() CreateOrderDTO: CreateOrderDTO) {
    const order = await this.orderService.createOrder(CreateOrderDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Nuevo Pedido Registrado Satisfactoriamente',
      user: order,
    });
  }
  //Con decorador Public no hay necesidad de generar token
  @Public()
  @Get('/')
  async getOrders(@Res() res) {
    const orders = await this.orderService.getOrders();
    return res.status(HttpStatus.OK).json({
      message: 'Pedidos Registrados',
      orders,
    });
  }

  @Get('/:orderId')
  async getUser(@Res() res, @Param('orderId') orderId) {
    /*var ObjectId = require('mongoose').ValidationPipe.ObjectId;
    if( !ObjectId.isValid(userId) )
    return false;*/
    if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
      // it's an ObjectID
      const order: any = await this.orderService.getOrder(orderId);
      if (!order) throw new NotFoundException('Pedido no registrado');
      return res.status(HttpStatus.OK).json(order);
    } else {
      // nope
      // throw new Error('Id invalido');
      const mensaje = {
        message: 'Id Invalido',
      };
      return res.status(HttpStatus.OK).json(mensaje);
    }
  }

  @Delete('/delete')
  async deleteOrder(@Res() res, @Query('orderId') orderId) {
    const orderDeleted = await this.orderService.deleteOrder(orderId);
    if (!orderId) throw new NotFoundException('Pedido no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Pedido Eliminado Satisfactoriamente',
      orderDeleted,
    });
  }
  /*
  Link para eliminar un producto del Array
  https://es.stackoverflow.com/questions/371525/eliminar-un-objeto-dentro-de-un-array-en-mongodb
  */

  @Put('/update')
  async updateOrder(
    @Res() res,
    @Body() CreateOrderDTO: CreateOrderDTO,
    @Query('orderId') orderId,
  ) {
    console.log('Entró a controller');

    const orderUpdated = await this.orderService.updateOrder(
      orderId,
      CreateOrderDTO,
    );

    if (!orderUpdated) throw new NotFoundException('Pedido no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Pedido Actualizado Satisfactoriamente',
      orderUpdated,
    });
  }
}
