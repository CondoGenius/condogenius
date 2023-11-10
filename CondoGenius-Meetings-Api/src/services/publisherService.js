const amqp = require('amqplib');

async function sendMessage(message) {
  const connection = await amqp.connect('amqp://condogenius-rabbitmq-1'); // URL do seu servidor RabbitMQ
  const channel = await connection.createChannel();
  const exchangeName = 'notifications'; // Nome da sua exchange

  // Assert a exchange para garantir que ela exista
  await channel.assertExchange(exchangeName, 'fanout', { durable: false }); // Tipo de exchange: 'direct', 'fanout', ou 'topic'

  // Enviar mensagem para a exchange com uma chave de roteamento
  channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
  console.log(`Mensagem enviada para a exchange: ${message}`);

  // Fechar a conexão e o canal após enviar a mensagem
  setTimeout(() => {
    connection.close();
  }, 500);
}

module.exports = sendMessage;