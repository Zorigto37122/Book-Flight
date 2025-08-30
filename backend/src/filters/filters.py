from pydantic import BaseModel
from src.models import *

from sqlalchemy_filterset import (
    Filter,
    FilterSet,
    InFilter,
    JoinStrategy,
    LimitOffsetFilter,
    MultiJoinStrategy,
    OrderingField,
    OrderingFilter,
    RangeFilter,
    SearchFilter,
)

class FlightFilterSet(FilterSet):
    id = Filter(FlightModel.id)
    ids = InFilter(FlightModel.id)
    departure_airport_id = Filter(FlightModel.departure_airport_id)
    name = SearchFilter(FlightModel.name)
    price = RangeFilter(FlightModel.price)
    is_active = Filter(FlightModel.is_active)
    category_type = Filter(
        Category.type,
        strategy=JoinStrategy(
            Category,
            Product.category_id == Category.id,
        ),
    )
    tag_title = Filter(
        Tag.title,
        strategy=MultiJoinStrategy(
            JoinStrategy(TagToProduct, onclause=Product.id == TagToProduct.right_id),
            JoinStrategy(Tag, onclause=Tag.id == TagToProduct.left_id),
        ),
    )
    ordering = OrderingFilter(
        name=OrderingField(Product.name),
        price=OrderingField(Product.price),
    )
    limit_offset = LimitOffsetFilter()


class ProductFilterSchema(BaseModel):
    id: int | None
    ids: list[int] | None
    name: str | None
    limit_offset: tuple[int | None, int | None] | None

    class Config:
        orm_mode = True