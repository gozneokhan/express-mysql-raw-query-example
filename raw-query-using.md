raw-query 사용 방법
mysql2 라이브러리에서 raw-query는 connect.promise().query() 형식으로 사용합니다. 또한 데이터 정의(DDL), 데이터 조작어(DML)등 다양한 SQL 명령어를 사용할 수 있습니다.

Raw Query는 직접 SQL 쿼리를 작성하여 데이터베이스와 상호작용하는 방식입니다. 이를 통해 개발자는 데이터베이스에 대한 완전한 제어를 할 수 있습니다. 그러나 Raw Query를 사용하는 경우 몇 가지 한계가 있습니다.

유지보수의 어려움: Raw Query를 사용하면 SQL 쿼리를 직접 작성해야 하므로 테이블 구조 변경이나 쿼리 수정 시 관련 코드를 모두 수동으로 업데이트해야 합니다. 이는 코드의 유지보수를 어렵게 만들 수 있습니다.

보안 취약점: 사용자로부터 입력된 데이터를 직접 SQL 쿼리에 넣는 경우, SQL 인젝션 공격에 취약할 수 있습니다. 사용자가 악의적인 SQL 코드를 입력하여 데이터베이스에 해를 가할 수 있습니다.

객체지향적이지 않음: Raw Query를 사용하면 데이터베이스와 상호작용할 때 객체지향적인 개념을 사용하기 어렵습니다. 데이터를 객체로 다루기보다는 테이블과 열의 형태 그대로 다루어져서 코드의 가독성이 떨어질 수 있습니다.

ORM(Object-Relational Mapping)은 이러한 Raw Query의 한계를 극복하기 위해 등장했습니다. ORM은 데이터베이스의 테이블을 자바스크립트 객체로 매핑하여 데이터베이스와 상호작용할 수 있도록 합니다. 이를 통해 개발자는 직접 SQL 쿼리를 작성하는 대신 객체 지향적인 방식으로 데이터베이스를 다룰 수 있습니다. 이는 코드의 유지보수성을 높이고 개발 생산성을 향상시킵니다.