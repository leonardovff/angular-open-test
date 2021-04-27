import { MessageService } from "./message.service";

describe('MessageService', () => {
    it('should have no messages when start', () => {
        const service: MessageService = new MessageService();

        expect(service.messages.length).toBe(0);
    });
    it('should add a message when add is called', () => {
        const service: MessageService = new MessageService();

        service.add('message test1');

        expect(service.messages.length).toBe(1);
    });

    it('should clear messages when clear is called', () => {
        const service: MessageService = new MessageService();
        service.add('message test1');
        service.add('message test2');

        service.clear();

        expect(service.messages.length).toBe(0);
    });
});