export const TYPES = {
  Logger: Symbol.for('Logger'),
  Application: Symbol.for('Application'),
  ConfigProvider: Symbol.for('ConfigProvider'),
  DatabaseClient: Symbol.for('DatabaseClient'),

  UserRepository: Symbol.for('UserRepository'),
  OfferRepository: Symbol.for('OfferRepository'),
  CommentRepository: Symbol.for('CommentRepository'),

  CommentService: Symbol.for('CommentService'),
  OfferService: Symbol.for('OfferService'),
  UserService: Symbol.for('UserService'),

  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
} as const;
